import React, { useEffect, useState } from 'react';
import { Avatar } from '@material-ui/core';
import './SidebarChat.css';
import db from './firebase';
import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';


function SidebarChat({ id, name, addNewChat }) {
    const [seed, setSeed] = useState('');
    const [message, setMessages] = useState('');

    useEffect(() => {
        if(id){
            db.collection('rooms')
            .doc(id)
            .collection('messages')
            .orderBy('timestamp', 'desc')
            .onSnapshot((snapshot) => 
              setMessages(snapshot.docs.map((doc) =>
              doc.data()))
            );
        }
    }, [id])

    useEffect(() => {
        setSeed(Math.floor(Math.random()*5000));
    }, []);

    const createChat = () => {
        
        const roomName = prompt("Please enter name for chat room");

        if (roomName){
           // do something 
           db.collection('rooms').add({
               name: roomName,
           });
        }
    };

    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
            <div className="sidebarChat">
            <Avatar src={`https://avatars.dicebear.com/api/bottts/${seed}.svg`} title={ name }/>
            <div className="sidebarChat_info">
                <h2>{ name }</h2>
                <p>{message[0]?.message}.</p>
            </div>
        </div>
        </Link>
        
    ) : (<div onClick={ createChat } className="sidebarChat add">
        <h2><AddIcon className="icon" title="Add Chat Room"/> <span>Add Chat Room</span></h2>
    </div>);
}

export default SidebarChat
