// Simulated database for slots
let slots = Array(10).fill(null);

// Get all parking slots
const getSlots = (req, res) => {
  res.json(slots);
};

// Book a parking slot
const bookSlot = (req, res) => {
  const { index } = req.params;
  const { vehicleType } = req.body;

  if (slots[index]) {
    return res.status(400).json({ message: `Slot ${+index + 1} is already booked` });
  }

  slots[index] = vehicleType;
  res.json({ message: `Slot ${+index + 1} booked for a ${vehicleType}` });
};

// Release a booked parking slot
const releaseSlot = (req, res) => {
  const { index } = req.params;

  if (!slots[index]) {
    return res.status(400).json({ message: `Slot ${+index + 1} is already empty` });
  }

  slots[index] = null;
  res.json({ message: `Slot ${+index + 1} has been released` });
};

module.exports = {
  getSlots,
  bookSlot,
  releaseSlot,
};
