import React, { useEffect, useState, useParams } from "react";
import { Avatar } from '@material-ui/core'
import './SidebarChat.css'
import {  Link } from "react-router-dom";

// echo "# whatsapp-clone" >> README.md
// git init
// git add README.md
// git commit -m "first commit"
// git branch -M main
// git remote add origin https://github.com/Phunbyt/whatsapp-clone.git
// git push -u origin main

import db from '../firebase'
const SidebarChat = ({ addNewChat, name, id }) => {
    const [seed, setSeed] = useState('')
    const [messages, setMessages] = useState([]);

    useEffect(() => {
      if (id) {
        db.collection("rooms")
          .doc(id)
          .collection("messages")
          .orderBy("timestamp", "desc")
          .onSnapshot((snapshot) =>
            setMessages(snapshot.docs.map((doc) => doc.data()))
          );
      }
    }, [id]);

    useEffect(() => {setSeed(Math.random() *5000)}, [])

    const createChat = () => {
        const roomName = prompt('Please enter name for chat')
        if (roomName) {
            db.collection("rooms").add({ name: roomName });
        }
    }
    return !addNewChat ? (
      <Link to={`/rooms/${id}`}>
        <div className="sidebarChat">
          <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
          <div className="sidebarChat__info">
            <h2>{name}</h2>
            <p>{messages[0]?.message}</p>
          </div>
        </div>
      </Link>
    ) : (
      <div onClick={createChat} className="sidebarChat">
        <h2>Add New Chat</h2>
      </div>
    );
}

export default SidebarChat
