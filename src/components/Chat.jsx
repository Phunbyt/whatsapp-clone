import React, { useState, useEffect,  } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { AttachFile, InsertEmoticon, Mic, SearchOutlined } from "@material-ui/icons/";
import {useParams} from 'react-router-dom'
import './Chat.css'
import db from '../firebase'
import firebase from "firebase";
import { useStateValue } from "../reducer/StateProvider";
const Chat = () => {
    const { roomId } = useParams();
  const [{ user }, dispatch] = useStateValue();
    const [seed, setSeed] = useState("");
    const [input, setInput] = useState("");

    const [roomName, setRoomName] = useState('')
    const [messages, setMessages] = useState([])

    useEffect(() => {
        if (roomId) {
            db.collection('rooms').doc(roomId)
                .onSnapshot(snapshot => (setRoomName(snapshot.data().name)))
            
            db.collection("rooms")
              .doc(roomId)
              .collection("messages")
              .orderBy("timestamp", "asc")
              .onSnapshot((snapshot) => setMessages(snapshot.docs.map(doc=>doc.data())));
     }
    }, [roomId]);

    useEffect(() => {
      setSeed(Math.random() * 5000);
    }, [roomId]);

    const sendMessage = (e) => {
        e.preventDefault();
        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        setInput("");
    }
    return (
      <div className="chat">
        <div className="chat__header">
          <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
          <div className="chat__headerInfo">
            <h3>{roomName}</h3>
                    <p>Last seen { new Date(messages[messages.length-1]?.timestamp?.toDate()).toUTCString() }</p>
          </div>
          <div className="chat__headerRight">
            <IconButton>
              <SearchOutlined />
            </IconButton>

            <IconButton>
              <AttachFile />
            </IconButton>

            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </div>
        </div>
        <div className="chat__body">
          {messages.map((message) => (
            <p
              className={`chat__message ${
                message.name === user.displayName && "chat__receiver"
              }`}
            >
              <span className="chat__name">{message.name}</span>
              {message.message}
              <span className="chat__timestamp">
                {new Date(message.timestamp?.toDate()).toUTCString()}
              </span>
            </p>
          ))}
        </div>
        <div className="chat__footer">
          <InsertEmoticon />
          <form>
            <input
              type="text"
              onChange={(e) => setInput(e.target.value)}
              value={input}
              placeholder="Type a message"
              name=""
              id=""
            />
            <button onClick={sendMessage} type="submit">
              send message
            </button>
          </form>
          <Mic />
        </div>
      </div>
    );
}

export default Chat
