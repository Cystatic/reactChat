const router = require("express").Router();
const Group = require("../models/Group");
const User = require("../models/User")
//新建群
router.post("/", async (req, res) => {
  const newGroup = Group({
    master: req.body.userId,
    members: [req.body.userId],
    groupname: req.body.groupname,
  });
  try {
    const user = await User.findById(req.body.userId)
    const savedNewGroup = await newGroup.save();
    await user.updateOne({ $push: { joinedGroups:  savedNewGroup._id+""} });
    res.status(200).json(savedNewGroup._id);
  } catch (err) {
    res.status(500).json(err);
  }
});

//按照群名模糊搜索群
router.get("/search/:groupname", async (req, res) => {
  try {
    const groupname = req.params.groupname;
    //模糊查询
    const reg = new RegExp(groupname, "i");
    const group = await Group.find({ groupname: { $regex: reg } });
    res.status(200).json(group);
  } catch (err) {
    res.status(500).json(err);
  }
});

//加入群聊
router.put("/join", async (req, res) => {
  try {
    const group = await Group.findById(req.body.groupId);
    const user = await User.findById(req.body.userId)
    if (!group.members.includes(req.body.userId)) {
      await group.updateOne({ $push: { members: req.body.userId } });
      await user.updateOne({ $push: { joinedGroups: req.body.groupId } });
      return res.status(200).json(req.body.groupId);
    } else {
      return res.status(200).json("你已在该群");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//获取一个用户加入的所有群聊（不好但暂时这么用）
router.get("/allgroups/:userId", async (req, res) => {
  try {
      const userId = req.params.userId
    //   查询某个群中的成员是否包含用户
      const groups = await Group.find({members:{$elemMatch:{$eq:userId}}})
      res.status(200).json(groups)
  } catch (err) {
    res.status(500).json(err);
  }
});

//获取给定群号的全部成员
router.get("/allUsers/:groupId",async(req,res)=>{
  try{
    const group = await Group.findById(req.params.groupId);
    const users = await Promise.all(
      group.members.map((userId)=>{
        return User.findById(userId)
      })
    )

    let userList = [];
      users.map((user) => {
          const { _id, username, profilePicture } = user;
          userList.push({ _id, username, profilePicture });
      });
    res.status(200).json(userList)
  }catch(err){
    res.status(500).json(err)
  }
})

module.exports = router;
