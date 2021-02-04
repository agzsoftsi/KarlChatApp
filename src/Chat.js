import { Avatar, Fade, IconButton } from '@material-ui/core';
import { AttachFile, SearchOutlined } from '@material-ui/icons';
import MoreVert from '@material-ui/icons/MoreVert';
import React, {useEffect, useState} from 'react';
import MicIcon from '@material-ui/icons/Mic';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import "./Chat.css"
import { useParams } from 'react-router-dom';
import db from './firebase';
import firebase from 'firebase';
import { useStateValue } from './StateProvider';

function Chat() {
    const [input, setInput] = useState("");
    const [seed, setSeed] = useState('');
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState('');
    const [messages, setMessages] = useState([]);
    const [{ user }, dispatch] = useStateValue([]);

    useEffect(() => {
       if(roomId){
           db.collection('rooms')
           .doc(roomId)
           .onSnapshot((snapshot) => setRoomName
           (snapshot.data().name));

           db.collection('rooms')
           .doc(roomId).collection('messages')
           .orderBy('timestamp', 'asc')
           .onSnapshot((snapshot) =>
               setMessages(snapshot.docs.map((doc) => doc.data()))
           );
       }
    }, [roomId]);

    useEffect(() => {
        setSeed(Math.floor(Math.random()*5000));
    }, []);


    const sendMessage = (e) => {
        e.preventDefault();
        console.log("typed: ", input);

        db.collection("rooms").doc(roomId).collection("messages").add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });

        setInput("");
    };

    return (
        <div className="chat">
             <div className="chat_header">
            <Avatar src={`https://avatars.dicebear.com/api/bottts/${Math.floor(Math.random()*5000)}.svg`}/>
                <div className="chat_headerInfo">
                    <h3>{roomName}</h3>
                    <p>The Last Seen{" "}
                    {new Date(
                        messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()}</p>
                </div>
                <div className="chat_headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>
            <div className="chat_body">
                
                {messages.map(message =>(
                   <p className={`chat_message ${message.name === user.displayName && "chat_reviever"}`}>
                    <span className="chat_name">{message.name}</span>
                    {message.message}
                    <span className="chat_timestamp">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
                    <span className={`${message.name === user.displayName?"tail-g":"tail"}`}></span>
                </p>
                
                ))}
                
                
            </div>
            
            <div className="chat_footer">
                <InsertEmoticonIcon />
                <form>
                   <input type="text" placeholder="Type a message" value={input} onChange={e => setInput(e.target.value)}/> 
                    <button type="submit" onClick={sendMessage}>Send a message</button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat