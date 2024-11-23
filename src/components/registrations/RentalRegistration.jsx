import { useState } from 'react';
import { addVehicle } from '../../services/rentalRegService';
import { inputStyles } from './FoodRegistration';
import SubmitButton from '../common/button/SubmitButton';

const RentalRegistration = () => {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const available = true;

  const handleAddVehicle = async (e) => {
    e.preventDefault();
    if (name && desc && price && image) {
      await addVehicle(name, desc, price, image, available);
      alert('Vehicle added successfully!');
      setName('');
      setDesc('');
      setPrice('');
      setImage(null);
    }
  };

  return (
    <form onSubmit={handleAddVehicle} className="rental-registration-form flex justify-center items-center space-x-4 flex-wrap">
      <input className= {inputStyles} type="text" placeholder="Vehicle Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input className= {inputStyles} type="text" placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)} required />
      <input className= {inputStyles} type="number" placeholder="Price per Day" value={price} onChange={(e) => setPrice(e.target.value)} required />
      <input type="file" onChange={(e) => setImage(e.target.files[0])} required />
      {/* <button type="submit">Add Vehicle</button> */}
      <SubmitButton callToAction={'Add Vehicle'} />
    </form>
  );
};

export default RentalRegistration;
