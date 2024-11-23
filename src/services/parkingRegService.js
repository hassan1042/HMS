import { collection, addDoc, getDocs } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase/Firebase';

// Add Parking Spot
export const addParkingSpot = async (name, category, rate, isAvailable, imageFile) => {
  try {
    // Upload Image to Firebase Storage
    const imageRef = ref(storage, `parking/${imageFile.name}`);
    await uploadBytes(imageRef, imageFile);
    const imageUrl = await getDownloadURL(imageRef);

    // Add Parking Spot to Firestore
    await addDoc(collection(db, 'parkingSpots'), {
      name,
      category,
      rate,
      isAvailable,
      imageUrl,
    });
  } catch (error) {
    console.error('Error adding parking spot:', error);
  }
};

// Fetch Parking Spots
export const fetchParkingSpots = async () => {
  try {
    const snapshot = await getDocs(collection(db, 'parkingSpots'));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching parking spots:', error);
  }
};
