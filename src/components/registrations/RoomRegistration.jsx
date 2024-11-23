import { useState } from 'react';
import { addRoom } from '../../services/roomRegService';
import { inputStyles } from './FoodRegistration';
import SubmitButton from '../common/button/SubmitButton';

const RoomRegistration = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);  
  const [price, setPrice] = useState(0);
  const available = true;

  const handleAddRoom = async (e) => {
    e.preventDefault();
    if (name && description && image && price) {
      await addRoom(name, description, image, available, price );
      alert('Room added successfully!');
      setName('');
      setDescription('');
      setImage(null);
      setImage(0)
    }
  };

  return (
    <form onSubmit={handleAddRoom} className="room-registration-form flex justify-center items-center space-x-4 flex-wrap">
      <input className={inputStyles} type="text" placeholder="Room Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input className={inputStyles} type="number" placeholder="Price Per Day" value={price} onChange={(e) => setPrice(e.target.value)} required />
      <textarea rows={1} className={` ${inputStyles} `} placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
      <input type="file" onChange={(e) => setImage(e.target.files[0])} required />
      {/* <button type="submit">Add Room</button> */}
      <SubmitButton callToAction={'Add Room'} />
    </form>
  );
};

export default RoomRegistration;
