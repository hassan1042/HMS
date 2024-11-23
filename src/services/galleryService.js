import { collection, addDoc, getDocs } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase/Firebase';

// Add gallery Item
export const addToGallery = async (imageFile) => {
  try {
    // Upload Image to Firebase Storage
    const imageRef = ref(storage, `gallery/${imageFile.name}`);
    await uploadBytes(imageRef, imageFile);
    const imageUrl = await getDownloadURL(imageRef);

    // Add gallery Item to Firestore
    await addDoc(collection(db, 'galleryPics'), {
      imageUrl,
    });
  } catch (error) {
    console.error('Error adding picture to gallery:', error);
    return null;
  }
};

// Fetch gallery Items
export const fetchFromGallery = async () => {
  try {
    const snapshot = await getDocs(collection(db, 'galleryPics'));
    const galleryItems = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return galleryItems;
  } catch (error) {
    console.error('Error fetching gallery pics:', error);
    return [];
  }
};
