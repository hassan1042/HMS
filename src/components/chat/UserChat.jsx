// src/pages/UserChat.js

import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, addDoc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { useAuth } from '../../contexts/authContext';
import { db } from '../../firebase/Firebase';
import {inputStyles} from '../registrations/FoodRegistration';

const UserChat = () => {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    if (currentUser) {
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
  }, [currentUser]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return;
  
    await addDoc(collection(db, 'messages'), {
      userId: currentUser.uid,
      senderId: currentUser.uid,
      message: newMessage,
      timestamp: serverTimestamp(),
    });
  
    setNewMessage('');
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Chat with Admin</h2>
      <div className="overflow-y-auto bg-gray-50 p-4 rounded-lg shadow mb-4">
        {messages.map(msg => (
        ( msg.senderId === currentUser.uid || msg.senderId === 'admin') && msg.userId === currentUser.uid &&
         <div 
            key={msg.id} 
            className={`mb-2 p-2 rounded-lg shadow-md w-fit ${msg.senderId === currentUser.uid ? 'bg-green-100 text-right ms-auto' : msg.senderId === 'admin' ? 'bg-gray-300 text-left' : 'hidden'}`}
          >
            {msg.message}
          </div> 
        ))}
      </div>
      <div className="flex">
        <input 
          type="text" 
          value={newMessage} 
          onChange={(e) => setNewMessage(e.target.value)} 
          placeholder="Type a message..." 
          className={`flex-1  p-2 mr-2 ${inputStyles}`}
        />
        <button 
          onClick={handleSendMessage} 
          className="bg-green-500 hover:bg-green-800 transition-all duration-200 text-white px-4 py-2 rounded-xl"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default UserChat;
