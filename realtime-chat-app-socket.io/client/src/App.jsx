import './App.css';
import io from 'socket.io-client'
import { useState } from "react";
import Chat from "./components/Chat/Chat";

const socket = io.connect("http://localhost:3001")

function App() {

  const [username, setUsername] = useState();
  const [chat, setChat] = useState()
  const [showChat, setShowChat] = useState(false)

  //joinning to chat (group)
  const joinChat = () => {
    if (username !== "" && chat !== "") {
      socket.emit("join_chat", chat);
      setShowChat(true);
    }
  }


  return (
    <div className="App">
      { !showChat ? (
      <div className="signin">
        <img src="./assets/logo.png" alt="" />
        <h1 id='title'>Join a chat</h1>
        <input type='text' placeholder='username' onChange={(e) => { setUsername(e.target.value) }} title='enter your username'/>
        <input type='text' placeholder='chat name' onChange={(e) => { setChat(e.target.value) }} title='enter chat'/>
        <button onClick={joinChat}>Join chat</button>
      </div>)
      : (
      <Chat socket={socket} username={username} chat={chat} />
      )}
    </div>
  );
}

export default App;
