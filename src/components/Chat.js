import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // to get userId from URL parameters
import '../styles/Chat.css';

const Chat = () => {
  const { userId } = useParams(); // Extract userId from URL
  const token = localStorage.getItem('token'); // Get token from localStorage
  const headers = { Authorization: `Token ${token}` }; // Set Authorization header

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [roomName, setRoomName] = useState(null);
  const socketRef = useRef(null);
  const messageQueueRef = useRef([]); // Queue to track sent messages

  // Fetch room name from API
  useEffect(() => {
    const fetchRoomName = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/intrest-id/${userId}/`, { headers });
        setRoomName(response.data.id);
      } catch (error) {
        console.error('Failed to fetch room name', error);
      }
    };
    fetchRoomName();
  }, [userId]);

  // WebSocket setup after room name is fetched
  useEffect(() => {
    if (roomName) {
      socketRef.current = new WebSocket(`ws://localhost:8000/ws/chat/${roomName}/`);

      socketRef.current.onmessage = (event) => {
        const data = JSON.parse(event.data);

        // Remove message from queue if received back via WebSocket
        if (messageQueueRef.current.includes(data.message)) {
          messageQueueRef.current = messageQueueRef.current.filter(msg => msg !== data.message);
        } else {
          // Add message from other users to the state
          setMessages((prevMessages) => [...prevMessages, { sender: 'other', text: data.message }]);
        }
      };

      return () => {
        socketRef.current.close();
      };
    }
  }, [roomName]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() && roomName) {
      const messageData = { message: newMessage, sender: userId };
      socketRef.current.send(JSON.stringify(messageData));

      // Add to local state and message queue to prevent duplicate display
      setMessages((prevMessages) => [...prevMessages, { sender: 'me', text: newMessage }]);
      messageQueueRef.current.push(newMessage);
      
      setNewMessage('');
    }
  };

  return (
    <div className="chat-container">
      <>
        <div className="chat-header">
          <h2>Chat</h2>
        </div>
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.sender === 'me' ? 'sent' : 'received'}`}>
              <div className="chat-bubble">{msg.text}</div>
            </div>
          ))}
        </div>
        <form onSubmit={sendMessage} className="chat-input-container">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="chat-input"
            placeholder="Type a message..."
          />
          <button className="send-button">Send</button>
        </form>
      </>
    </div>
  );
};

export default Chat;
