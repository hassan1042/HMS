import React, { useEffect, useState } from "react";
import WeddingHallCard from "./WeddingHallCard";
import { fetchHalls } from "../../services/hallRegService";

const WeddingHalls = () => {
  const [halls, setHalls] = useState([]);
  useEffect(() => {
    const fetchAllHalls = async () => {
      const allHalls = await fetchHalls();
      setHalls(allHalls);
    };
    fetchAllHalls();
  }, []);
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Wedding Halls</h2>
      <div className="flex justify-center items-center space-x-4 w-full ">
        {halls.map((hall) => (
          <WeddingHallCard key={hall.id} hall={hall} />
        ))}
      </div>
    </div>
  );
};

export default WeddingHalls;
