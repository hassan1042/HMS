// src/pages/AdminChat.js

import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, doc, addDoc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebase/Firebase';
import { fetchChatUsers } from '../../services/chatService';
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";

const AdminChat = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [showSideMenu, setShowSideMenu] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedUsers = await fetchChatUsers();
      const senderOnly = fetchedUsers.filter((sender) => {
        return sender.id;
      })
      setUsers(senderOnly);
    };

    fetchData();
  }, []);

  

  useEffect(() => {
    if (selectedUser) {
      // Fetch chat history with selected user
      const messagesRef = collection(db, 'messages');
      const q = query(messagesRef, orderBy('timestamp'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const messageList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setMessages(messageList);
      });
      return unsubscribe;
    }
  }, [selectedUser]);

  const handleSendMessage = async (user) => {
    if (newMessage.trim() === '') return;
  
    await addDoc(collection(db, 'messages'), {
      userId: user,
      senderId: 'admin',
      message: newMessage,
      timestamp: serverTimestamp(),
    });
  
    setNewMessage('');
  };
  const handleSideMenu = () => {
    setShowSideMenu(!showSideMenu);
  }

  return (
    <div className="flex relative">
      {/* Left Sidebar - Users List */}
      <p 
      className='absolute -left-10 top-5 cursor-pointer'
        onClick={handleSideMenu}
      >
      <FaAnglesLeft
      className={`${showSideMenu ? '' : 'hidden'}`}
       />
        <FaAnglesRight
      className={`${showSideMenu ? 'hidden' : ''}`}
       />

      </p>
      <div className={`w-1/4 border-r bg-gray-100 p-4 h-[70vh] ${showSideMenu ? 'flex flex-col' : 'hidden'}`}>
        <h3 
        className="text-xl font-semibold mb-4">Users</h3>
        {users.map(user => (
          <div 
            key={user.id} 
            className={`p-2 rounded cursor-pointer mb-2 ${selectedUser?.id === user.id ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setSelectedUser(user)}
          >
            {user.name || 'Unknown User'}
          </div>
        ))}
      </div>

      {/* Right Panel - Chat Window */}
      <div className="flex-1 p-4 flex flex-col h-[70vh]">
        {selectedUser ? (
          <>
            <h3 className="text-xl font-semibold mb-4">Chat with {selectedUser.id}</h3>
            <div className="flex-1 overflow-y-auto bg-gray-50 p-4 rounded-lg shadow">
              {messages.map(msg => (
              msg.userId === selectedUser.id &&
              <div 
                  key={msg.id} 
                  className={`mb-2 p-2 rounded-lg shadow-md w-fit ${msg.senderId === 'admin' ? 'bg-blue-100 text-right ms-auto' : msg.senderId === selectedUser.id ? 'bg-gray-300 text-left ' : 'hidden'}`}
                >
                  {msg.message}
                </div>
              ))}
            </div>
            <div className="mt-4 flex">
              <input 
                type="text" 
                value={newMessage} 
                onChange={(e) => setNewMessage(e.target.value)} 
                placeholder="Type a message..." 
                className="flex-1 border rounded p-2 mr-2"
              />
              <button 
                onClick={() => handleSendMessage(selectedUser.id)} 
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <p>Select a user to start chatting</p>
        )}
      </div>
    </div>
  );
};

export default AdminChat;
