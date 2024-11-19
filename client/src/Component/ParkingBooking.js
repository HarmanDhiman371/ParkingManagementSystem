// // ParkingBooking.js
// import React, { useState } from 'react';
// import "../Styles/ParkingSlot.css";

// const ParkingBooking = () => {
//   const [vehicleType, setVehicleType] = useState('');
//   const [slots, setSlots] = useState(
//     Array(10).fill(null) // 10 slots initially
//   );

//   const handleVehicleTypeChange = (e) => setVehicleType(e.target.value);

//   const handleSlotBooking = (index) => {
//     const updatedSlots = [...slots];
//     if (!updatedSlots[index]) {
//       updatedSlots[index] = vehicleType;
//       setSlots(updatedSlots);
//       alert(`Slot ${index + 1} booked for a ${vehicleType}`);
//     } else {
//       alert(`Slot ${index + 1} is already booked!`);
//     }
//   };

//   return (
//     <div className="parking-container">
//       <h2>Book a Parking Slot</h2>

//       <label>Select Vehicle Type:</label>
//       <select value={vehicleType} onChange={handleVehicleTypeChange}>
//         <option value="">Select...</option>
//         <option value="2-wheeler">2-Wheeler</option>
//         <option value="3-wheeler">3-Wheeler</option>
//         <option value="4-wheeler">4-Wheeler</option>
//       </select>

//       <div className="slots">
//         {slots.map((slot, index) => (
//           <div
//             key={index}
//             className={`slot ${slot ? 'booked' : 'available'}`}
//             onClick={() => handleSlotBooking(index)}
//           >
//             {slot ? `${slot} `: `Slot ${index + 1}`}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ParkingBooking;
import React, { useState, useEffect } from 'react';
import "../Styles/ParkingSlot.css";

const ParkingBooking = () => {
  const [vehicleType, setVehicleType] = useState('');
  const [slots, setSlots] = useState([]);

  // Fetch slots from the backend when the component loads
  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/slots');
        const data = await response.json();
        setSlots(data);
      } catch (error) {
        console.error('Error fetching slots:', error);
      }
    };

    fetchSlots();
  }, []);

  // Handle vehicle type selection
  const handleVehicleTypeChange = (e) => setVehicleType(e.target.value);

  // Book or release a slot
  const handleSlotAction = async (index) => {
    if (!slots[index]) {
      // Slot is available; book it
      if (!vehicleType) {
        alert('Please select a vehicle type');
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/api/slots/${index}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ vehicleType }),
        });

        if (response.ok) {
          const result = await response.json();
          alert(result.message);
          fetchSlots(); // Refresh the slots
        } else {
          const errorData = await response.json();
          alert(errorData.message);
        }
      } catch (error) {
        console.error('Error booking slot:', error);
      }
    } else {
      // Slot is booked; release it
      try {
        const response = await fetch(`http://localhost:5000/api/slots/${index}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          const result = await response.json();
          alert(result.message);
          fetchSlots(); // Refresh the slots
        } else {
          const errorData = await response.json();
          alert(errorData.message);
        }
      } catch (error) {
        console.error('Error releasing slot:', error);
      }
    }
  };

  // Fetch the latest slot data from the backend
  const fetchSlots = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/slots');
      const data = await response.json();
      setSlots(data);
    } catch (error) {
      console.error('Error fetching slots:', error);
    }
  };

  return (
    <div className="parking-container">
      <h2>Manage Parking Slots</h2>

      <label>Select Vehicle Type:</label>
      <select value={vehicleType} onChange={handleVehicleTypeChange}>
        <option value="">Select...</option>
        <option value="2-wheeler">2-Wheeler</option>
        <option value="3-wheeler">3-Wheeler</option>
        <option value="4-wheeler">4-Wheeler</option>
      </select>

      <div className="slots">
        {slots.map((slot, index) => (
          <div
            key={index}
            className={`slot ${slot ? 'booked' : 'available'}`}
            onClick={() => handleSlotAction(index)}
          >
            {slot ? `${slot}` : `Slot ${index + 1}`}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParkingBooking;