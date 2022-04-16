import axios from "axios";
import { actionStart, loginSuccess, actionFailure ,logoutSuccess,follow,unfollow,joinedGroup} from "./userSlice";


export const loginCall = async (user, dispatch) => {
  dispatch(actionStart());
  try {
    const res = await axios.post("/auth/login", user);
    // console.log(res.data)  
    dispatch(loginSuccess(res.data));  
  } catch (err) {
    dispatch(actionFailure());
  }
};

export const logoutCall = (dispatch) => {
    dispatch(logoutSuccess())
}

export const followCall = async (id,dispatch) => {
  dispatch(actionStart());
  try{
    const res = await axios.put("/users/follow",id);
    dispatch(follow(res.data))
  }catch(err){
    dispatch(actionFailure());
  }
}

export const unfollowCall = async (id,dispatch) => {
  dispatch(actionStart());
  try{
    const res = await axios.put("/users/unfollow",id);

    dispatch(unfollow(res.data))
    console.log(res)
  }catch(err){
    dispatch(actionFailure());
  }
}

export const joinedGroupCall = async (id,dispatch) => {
  dispatch(actionStart());
  try{
    const res = await axios.put("/group/join",id);
    dispatch(joinedGroup(res.data))
  }catch(err){
    dispatch(actionFailure());
  }
}

