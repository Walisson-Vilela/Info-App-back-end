// controllers/vehicleController.js
const vehicles = require('../models/vehicleModel');

// Create
const createVehicle = (req, res) => {
  const newVehicle = req.body;
  vehicles.push(newVehicle);
  res.status(201).json(newVehicle);
};

// Read (Listar todos os veículos)
const getAllVehicles = (req, res) => {
  res.status(200).json(vehicles);
};

// Read (Buscar um veículo pelo ID)
const getVehicleById = (req, res) => {
  const vehicleId = parseInt(req.params.id);
  const vehicle = vehicles.find(v => v.id === vehicleId);
  if (vehicle) {
    res.status(200).json(vehicle);
  } else {
    res.status(404).json({ message: 'Vehicle not found' });
  }
};

// Update
const updateVehicle = (req, res) => {
  const vehicleId = parseInt(req.params.id);
  const vehicleIndex = vehicles.findIndex(v => v.id === vehicleId);
  if (vehicleIndex !== -1) {
    const updatedVehicle = { ...vehicles[vehicleIndex], ...req.body };
    vehicles[vehicleIndex] = updatedVehicle;
    res.status(200).json(updatedVehicle);
  } else {
    res.status(404).json({ message: 'Vehicle not found' });
  }
};

// Delete
const deleteVehicle = (req, res) => {
  const vehicleId = parseInt(req.params.id);
  const vehicleIndex = vehicles.findIndex(v => v.id === vehicleId);
  if (vehicleIndex !== -1) {
    vehicles.splice(vehicleIndex, 1);
    res.status(200).json({ message: 'Vehicle deleted' });
  } else {
    res.status(404).json({ message: 'Vehicle not found' });
  }
};

module.exports = {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
};
