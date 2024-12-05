
import React, { useState, useEffect ,useRef} from "react";
import { db } from "./firebase-config";
import {
  collection,
  addDoc,
  where,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import './styles.css'; // Import the CSS styles

export const Chat = ({ room, name }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesRef = collection(db, "messages");
  const messagesEndRef = useRef(null);
  // useEffect(() => {
  //   const queryMessages = query(
  //     messagesRef,
  //     where("room", "==", room),
  //     orderBy("createdAt")
  //   );
  //   const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
  //     let messages = [];
  //     snapshot.forEach((doc) => {
  //       messages.push({ ...doc.data(), id: doc.id });
  //     });
  //     console.log(messages);
  //     setMessages(messages);
  //     if (messagesEndRef.current) {
  //       messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  //     }
  //   });

  //   return () => unsuscribe();
  // }, []);
  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      console.log(messages);
      setMessages(messages);
    });
  
    return () => unsubscribe();
  }, [room]);
  
  // Scroll to the bottom whenever `messages` changes
 

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newMessage === "") return;
    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: name,
      room,
    });

    setNewMessage("");
  };
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  

  return (
    <div className="chat-app">
      <div className="header">
        <h1>Welcome to: {room.toUpperCase()}</h1>
      </div>
      {/* <div className="messages">
        {messages.map((message) => (
          <div key={message.id} className="message">
            <span className="user">{message.user}:</span> {message.text}
          </div>
        ))}
         <div ref={messagesEndRef} />
      </div> */}
      <div className="messages">
  {messages.map((message) => (
    <div
      key={message.id}
      className={`message ${message.user === name ? 'self' : 'other'}`}
    >
      <span className="user">{message.user}:</span> {message.text}
    </div>
  ))}
  <div ref={messagesEndRef} />
</div>

      <form onSubmit={handleSubmit} className="new-message-form">
        <input
          type="text"
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
          className="new-message-input"
          placeholder="Type your message here..."
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
    
  );
};
