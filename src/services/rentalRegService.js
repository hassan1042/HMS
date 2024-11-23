import { collection, addDoc, getDocs } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase/Firebase';

// Add Vehicle
export const addVehicle = async (name, desc, price, imageFile, available ,) => {
  try {
    // Upload Image to Firebase Storage
    const imageRef = ref(storage, `vehicles/${imageFile.name}`);
    await uploadBytes(imageRef, imageFile);
    const imageUrl = await getDownloadURL(imageRef);

    // Add Vehicle to Firestore
    await addDoc(collection(db, 'vehicles'), {
      name,
      desc,
      price,
      imageUrl,
      available,
    });
  } catch (error) {
    console.error('Error adding vehicle:', error);
  }
};

// Fetch Vehicles
export const fetchVehicles = async () => {
  try {
    const snapshot = await getDocs(collection(db, 'vehicles'));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching vehicles:', error);
  }
};
