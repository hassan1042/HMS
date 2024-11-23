import { collection, addDoc, getDocs } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase/Firebase';

// Add Room
export const addRoom = async (name, description, imageFile, available, price) => {
  try {
    // Upload Image to Firebase Storage
    const imageRef = ref(storage, `rooms/${imageFile.name}`);
    await uploadBytes(imageRef, imageFile);
    const imageUrl = await getDownloadURL(imageRef);

    // Add Room to Firestore
    await addDoc(collection(db, 'rooms'), {
      name,
      description,
      imageUrl,
      available,
      price,
    });
  } catch (error) {
    console.error('Error adding room:', error);
  }
};

// Fetch Rooms
export const fetchRooms = async () => {
  try {
    const snapshot = await getDocs(collection(db, 'rooms'));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching rooms:', error);
  }
};
