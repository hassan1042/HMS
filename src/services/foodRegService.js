import { collection, addDoc, getDocs,  } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase/Firebase';

// Add Food Item
export const addFoodItem = async (name, category, price, imageFile, available, desc) => {
  try {
    // Upload Image to Firebase Storage
    const imageRef = ref(storage, `food/${imageFile.name}`);
    await uploadBytes(imageRef, imageFile);
    const imageUrl = await getDownloadURL(imageRef);

    // Add Food Item to Firestore
    await addDoc(collection(db, 'foodItems'), {
      name,
      category,
      price,
      imageUrl,
      available,
      desc,
    });
  } catch (error) {
    console.error('Error adding food item:', error);
  }
};

// Fetch Food Items
export const fetchFoodItems = async () => {
  try {
    const snapshot = await getDocs(collection(db, 'foodItems'));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching food items:', error);
  }
};
