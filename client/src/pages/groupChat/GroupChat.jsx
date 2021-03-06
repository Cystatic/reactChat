import "./GroupChat.css"
import Topbar from "../../components/topbar/Topbar"
import {useEffect, useRef, useState } from "react"
import Group from "../../components/group/Group"
import Message from "../../components/message/Message"
import GroupMember from "../../components/groupMember/GroupMember"
// import { AuthContext } from "../../context/AuthContext";
import axios from "axios"
import SearchIcon from '@mui/icons-material/Search';
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux"
import { joinedGroupCall } from "../../redux/apiCalls"
import {joinedGroup} from "../../redux/userSlice"

export default function Groupgroup() {


    const [newGroup, setNewGroup] = useState(false)
    const [newGroupName, setNewGroupName] = useState("")
    // const { user, dispatch } = useContext(AuthContext)
    const user = useSelector((state) => state.user.userInfo);
    const error = useSelector((state) => state.user.error);
    const dispatch = useDispatch();
    const [groups, setGroups] = useState([])
    const [curGroup, setCurGroup] = useState(null)
    const searchName = useRef()
    const [searchedGroups, setSearchGroups] = useState([])
    const [isSearch, setIsSearch] = useState(false)
    const [curGroupMembers, setCurGroupMembers] = useState([])
    const [messages, setMessages] = useState([])
    const scrollRef = useRef();
    const newMessage = useRef();
    const socket = useRef();
    const [arrivalMessage, setArrivalMessage] = useState(null)

    useEffect(()=>{
        socket.current = io.connect("ws://localhost:8900");
    },[user])

    useEffect(()=>{
        socket.current.on("welcome", message => {
            console.log(message)
        })

        socket.current.on("recieveMessage",(data)=>{
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now()
            })
        })
    },[socket])

    useEffect(()=>{
        arrivalMessage &&
            arrivalMessage.sender!==user._id &&
            curGroup?.members.includes(arrivalMessage.sender) &&
            setMessages((prev) => [...prev, arrivalMessage])
    },[arrivalMessage,curGroup,user])


    const handleNewGroup = () => {
        setNewGroup(true)
    }

    const handleConfirmNewGroup = async () => {
        const newGroup = {
            userId: user._id,
            groupname: newGroupName
        }
        try {
            const res = await axios.post("/group", newGroup);
            // console.log(res)
            
            // dispatch({ type: "JOINED", payload: res.data._id });
            dispatch(joinedGroup(res.data))
            
            setNewGroup(false)
        } catch (err) {
            console.log(err)
        }
    }
    const handleCancelNewGroup = () => {
        setNewGroup(false)
    }


    const handleSearchGroup = async () => {
        if (searchName.current.value === "") {
            setIsSearch(false)
        } else {
            try {
                const res = await axios.get("/group/search/" + searchName.current.value)
                setSearchGroups(res.data);
                setIsSearch(true)
            } catch (err) {
                console.log(err)
            }
        }
    }
    //????????????????????????????????????
    useEffect(() => {
        const getGroups = async () => {
            const res = await axios.get("/users/allGroups/" + user._id)
            // console.log(res.data)
            setGroups(res.data);
        }
        getGroups()
    }, [user, newGroup])


    //????????????????????????????????????
    const handleSearchedGroup = async (group, e) => {
        e.preventDefault()
        //??????????????????????????????????????????????????????  
        if (user.joinedGroups.includes(group._id)) {
            setCurGroup(group)
        } else {
            try {
                joinedGroupCall({ userId: user._id, groupId: group._id },dispatch)
                // const res = await axios.put("/group/join", { userId: user._id, groupId: group._id })
                await setCurGroup(group)
                console.log(error)
            } catch (err) {
                console.log(err)
            }
        }
    }

    const handleJoinedGroup = async (group, e) => {
        e.preventDefault()
        setCurGroup(group)      
    }
   

    //???????????????????????????????????????????????????
    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await axios.get("/message/group/" + curGroup?._id)
                setMessages(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getMessages();
        if(curGroup){
            socket.current.emit("joinedRoom",{roomId:curGroup._id})     
        }    
    }, [curGroup])

    //??????????????????????????????
    useEffect(() => {
        const getCurGroupMembers = async () => {
            try {
                const res = await axios.get("/group/allUsers/" + curGroup?._id)
                setCurGroupMembers(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        if (curGroup !== null) {
            getCurGroupMembers()
        }
    }, [curGroup])

     //??????????????????????????????
     useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = async(e) => {
        e.preventDefault();

        socket.current.emit("sendGroupMessage",{
            senderId: user._id,
            groupId: curGroup?._id,
            text: newMessage.current.value
        })
        const curMessage = {
            groupId : curGroup._id,
            sender: user._id,
            text : newMessage.current.value
        }
        try{
            const res = await axios.post("/message/group",curMessage)
            newMessage.current.value=""
            setMessages([...messages, res.data])
        }catch(err){
            console.log(err)
        }
    }

    return (
        <>
            <Topbar />
            <div className="groupChat">
                <div className="groupMenu">
                    <div className="groupMenuWrapper">
                        <div className="searchBox">
                            <input placeholder="Search for Groups"
                                ref={searchName}
                                required
                                className="groupMenuInput" />
                            <div className="searchImg">
                                <SearchIcon
                                    sx={{ fontSize: 30 }}
                                    onClick={handleSearchGroup} />
                                <div className="newGroup">
                                </div>
                            </div>
                        </div>
                        <div>
                            {newGroup ?
                                <>
                                    <input
                                        placeholder="????????????"
                                        value={newGroupName}
                                        className="newGroupNameInput"
                                        onChange={(e) => { setNewGroupName(e.target.value) }}
                                        required
                                    />
                                    <button className="confirmButton" onClick={handleConfirmNewGroup}>??????</button>
                                    <button className="confirmButton" onClick={handleCancelNewGroup}>??????</button>
                                </> :
                                <button className="newGroupButton" onClick={handleNewGroup}>????????????</button>
                            }
                        </div>
                        <div>
                            {!isSearch ?
                                groups.map((group) => (
                                    <div key={group._id} onClick={(e) => { handleJoinedGroup(group,e) }}>
                                        <Group key={group._id} group={group} />
                                    </div>
                                )) :
                                searchedGroups.map((group) => (
                                    <div key={group._id} onClick={(e) => handleSearchedGroup(group, e)}>
                                        <Group key={group._id} group={group} />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className="groupBox">
                    <div className="groupBoxWrapper">{
                        curGroup ?
                        <>
                            <div className="groupBoxTop">
                                {messages.map((m) => (
                                        <div key={m._id} ref={scrollRef}>
                                            <Message key={m._id} own={m.sender === user._id} message={m} />
                                        </div>
                                ))}
                            </div>
                            <div className="groupBoxBottom">
                                <textarea
                                    className="chatMessageInput"
                                    placeholder="write something..."
                                    ref = {newMessage}
                                ></textarea>
                                <button className="chatSubmitButton" onClick={handleSendMessage}>
                                    Send
                                </button>
                            </div>
                        </> : 
                        <><span className="noConversationText">Open a group to start a chat.</span></>
                    }
                    </div>
                </div>
                <div className="groupMembers">
                    <div className="groupMembersWrapper">
                        {curGroupMembers ?
                            curGroupMembers.map((member) => (
                                <GroupMember key={member._id} member={member} />
                            ))
                            : <></>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
