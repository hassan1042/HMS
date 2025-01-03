import { collection, addDoc, getDocs } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase/Firebase';

// Add Hall
export const addHall = async (name, description, pp, imageFile, available, offers) => {
  try {
    // Upload Image to Firebase Storage
    const imageRef = ref(storage, `halls/${imageFile.name}`);
    await uploadBytes(imageRef, imageFile);
    const imageUrl = await getDownloadURL(imageRef);

    // Add Hall to Firestore
    await addDoc(collection(db, 'halls'), {
      name,
      description,
      pp,
      imageUrl,
      available,
      offers,
    });
  } catch (error) {
    console.error('Error adding hall:', error);
  }
};

// Fetch Halls
export const fetchHalls = async () => {
  try {
    const snapshot = await getDocs(collection(db, 'halls'));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching halls:', error);
  }
};
// Fetch Halls bookings
export const fetchHallsBookings = async () => {
  try {
    const snapshot = await getDocs(collection(db, 'wedding-hall-bookings'));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching halls:', error);
  }
};
