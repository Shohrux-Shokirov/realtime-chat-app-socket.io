import React from 'react'
import { useState, useEffect } from "react";
import ScrollToBottom from 'react-scroll-to-bottom'
import {IoSendSharp as SendBtn} from 'react-icons/io5'
import "./Chat.css";

function Chat({ socket, username, chat }) {

  const [message, setMessage] = useState("")
  const [messageData, setMessageData] = useState([])

  const sendMessage = async () => {
    if (message !== "") {
      const messageInfo = {
        chat: chat,
        sender: username,
        message: message,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageInfo);
      setMessageData((list) => [...list, messageInfo])
      setMessage("")
    }
  }

  useEffect(() => {
    socket.on("recieve_message", (data) => {
      setMessageData((list) => [...list, data])
    })
  }, [socket])


  return (
    <div className="chat">
      <header><p id='chatName'> {chat} </p></header>
      <main>
        <ScrollToBottom className='message-container'>
          {messageData && messageData.map((mes, i) => {
            return <div key={i} className="message" id={username === mes.sender ? "you" : "other"}>
              <div className='message-wrapper'>
                <div className="message-content">
                  <p>{mes.message}</p>
                </div>
                <div className="message-meta">
                  <p className='time'>{mes.time}</p>
                  <p className='person'>{mes.sender}</p>
                </div>
              </div>
            </div>
          })}
        </ScrollToBottom>
      </main>
      <footer>
        <input
          type="text"
          placeholder='type here...'
          onChange={(e) => { setMessage(e.target.value) }}
          value={message}
          onKeyUp={(e) => { e.key === "Enter" && sendMessage() }} />
        <button onClick={sendMessage}> <SendBtn /> </button>
      </footer>
    </div>
  )
}

export default Chat