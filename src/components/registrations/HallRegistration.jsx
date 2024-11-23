import { useState } from 'react';
import { addHall } from '../../services/hallRegService';
import { inputStyles } from './FoodRegistration';
import SubmitButton from '../common/button/SubmitButton';
import Loader from '../common/loader/Loader';

const HallRegistration = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [ pp , setPp] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const available = true;


  const handleAddHall = async (e) => {
    e.preventDefault();
    if (name && description && pp && image) {
      setLoading(true);
      await addHall(name, description, pp, image, available);
      setLoading(false);
      setName('');
      setDescription('');
      setPp('');
      setImage(null);
    }
  };

  return (
 loading ? <Loader msg={'Adding the hall'}/> :
    <form onSubmit={handleAddHall} className="hall-registration-form flex justify-center items-center space-x-4 flex-wrap">
      <input className= {inputStyles} type="text" placeholder="Hall Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <textarea rows={1} className={`${inputStyles}`} placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
      <input className= {inputStyles} type="number" value={pp} onChange={(e) => setPp(e.target.value)} placeholder='rate per person' required />
      <input type="file" onChange={(e) => setImage(e.target.files[0])} required />
      {/* <button type="submit">Add Hall</button> */}
      <SubmitButton callToAction={"Add Hall"} />
    </form>
  );
};

export default HallRegistration;
