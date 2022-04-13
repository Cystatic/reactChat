import "./Messenger.css";
import Topbar from "../../components/topbar/Topbar"
import Message from "../../components/message/Message";
import Conversation from "../../components/conversation/Conversation";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { io } from "socket.io-client";



export default function Messenger() {

    const { user } = useContext(AuthContext)
    const [conversations, setConversations] = useState([])
    const [curChat, setCurChat] = useState(null)
    const [messages, setMessages] = useState(null)
    const [newMessage, setNewMessage] = useState("");
    const scrollRef = useRef();
    const [arrivalMessage, setArrivalMessage] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([]);
    const socket = useRef()
    useEffect(()=>{
        socket.current = io.connect("ws://localhost:8900");
    },[user])
    // const socket = io.connect("ws://localhost:8900");


    useEffect(() => {
        socket.current.on("welcome", message => {
            console.log(message)
        })
        socket.current.emit("addUser", user?._id);
        socket.current.on("getUsers", users => {
            setOnlineUsers(
                user.followings.filter((f) => users.some((u) => u.userId === f))
            );
        })
        socket.current.on("getMessage", (data) => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now()
            })
        })
    }, [user,socket])

    useEffect(() => {
        arrivalMessage &&
            curChat?.members.includes(arrivalMessage.sender) &&
            setMessages((prev) => [...prev, arrivalMessage])
    }, [arrivalMessage, curChat])

    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await axios.get("/conversation/" + user._id)
                setConversations(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getConversations();
    }, [user])

    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await axios.get("/message/" + curChat?._id)
                setMessages(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getMessages();
    }, [curChat])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
            sender: user._id,
            text: newMessage,
            conversationId: curChat._id,
        };
        const recieverId = curChat.members.find(
            (member) => member != user._id
        )
        socket.current.emit("sendMessage", {
            senderId: user._id,
            recieverId,
            text: newMessage
        })
        try {
            const res = await axios.post("/message", message);
            setMessages([...messages, res.data]);
            setNewMessage("");
        } catch (err) {
            console.log(err)
        }

    }
    //每次消息都定位到最新
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
    return (
        <>
            <Topbar />
            <div className="messenger">

                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input placeholder="Search for friends" className="chatMenuInput" />
                        {conversations.map((c) => (
                            <div key={c._id} onClick={() => { setCurChat(c) }}>
                                <Conversation conversation={c} curUser={user} />
                            </div>
                        ))}

                    </div>
                </div>

                <div className="chatBox">
                    <div className="chatBoxWrapper">{
                        curChat ?
                            (<>
                                <div className="chatBoxTop">
                                    {messages.map((m) => (
                                        <div key={m._id} ref={scrollRef}>
                                            <Message key={m._id} own={m.sender === user._id} message={m} />
                                        </div>
                                    ))}
                                </div>
                                <div className="chatBoxBottom">
                                    <textarea
                                        className="chatMessageInput"
                                        placeholder="write something..."
                                        value={newMessage}
                                        onChange={(e) => { setNewMessage(e.target.value) }}
                                    ></textarea>
                                    <button className="chatSubmitButton" onClick={handleSubmit}>
                                        Send
                                    </button>
                                </div>
                            </>)
                            : (<span className="noConversationText">Open a conversation to start a chat.</span>)
                    }
                    </div>
                </div>

                <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                        <ChatOnline
                            onlineUsers={onlineUsers}
                            curUserId = {user._id}
                            setCurChat={setCurChat}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
