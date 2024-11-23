import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { useAuth } from '../../contexts/authContext';
import { db } from '../../firebase/Firebase';

const UserControlsHall = () => {
  const { currentUser } = useAuth();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (currentUser) {
      const unsubscribe = onSnapshot(
        collection(db, 'wedding-hall-notifications'),
        (snapshot) => {
          const userNotifications = snapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .filter(notification => notification.userId === currentUser.uid);
          setNotifications(userNotifications);
        }
      );
      return unsubscribe;
    }
  }, [currentUser]);

  const deleteNotification = async (notificationId) => {
    await deleteDoc(doc(db, 'wedding-hall-notifications', notificationId));
  };

  return (
    <div className="container mx-auto p-4 ">
    <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">Notifications</h2>
    {notifications.length === 0 ? (
      <p className="text-gray-500 italic">No notifications available</p>
    ) : (
      notifications.map(notification => (
        <div
          key={notification.id}
          className="p-5 mb-4 bg-gray-100 border shadow-md rounded-lg transform transition duration-500 hover:shadow-lg hover:scale-105 flex flex-wrap justify-between items-center "
        >
        {
          console.log(notification.message)
        }
        <p className='font-bold text-gray-500 italic' >{notification.userName}!</p>
          <p className="text-gray-700">{notification.message} <span className='font-bold italic'>Booked Hall : {notification.hallName}</span></p>
          
          <button
            onClick={() => deleteNotification(notification.id)}
            className="mt-3 px-4 py-2 bg-red-500 text-white rounded-full transition duration-300 hover:bg-red-600 hover:scale-105"
          >
            Delete
          </button>
        </div>
      ))
    )
    }
  </div>
  
  );
};

export default UserControlsHall;
