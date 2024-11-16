const { readVehiclesFromFile, saveVehiclesToFile } = require('../models/vehicleModel');

// CRUD

// Create
const createVehicle = (req, res) => {
  const newVehicle = req.body;
  const vehicles = readVehiclesFromFile(); // Lê os veículos do arquivo
  newVehicle.id = vehicles.length + 1; // Atribui um ID único
  vehicles.push(newVehicle); // Adiciona o novo veículo ao array
  saveVehiclesToFile(vehicles); // Salva os dados no arquivo
  res.status(201).json(newVehicle); // Retorna o veículo recém-criado
};

// Read (Listar todos os veículos)
const getAllVehicles = (req, res) => {
  const vehicles = readVehiclesFromFile(); // Lê os veículos do arquivo
  res.status(200).json(vehicles); // Retorna os veículos
};

// Read (Buscar um veículo pelo ID)
const getVehicleById = (req, res) => {
  const vehicleId = parseInt(req.params.id);
  const vehicles = readVehiclesFromFile(); // Lê os veículos do arquivo
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
  const vehicles = readVehiclesFromFile(); // Lê os veículos do arquivo
  const vehicleIndex = vehicles.findIndex(v => v.id === vehicleId);
  
  if (vehicleIndex !== -1) {
    const updatedVehicle = { ...vehicles[vehicleIndex], ...req.body };
    vehicles[vehicleIndex] = updatedVehicle; // Atualiza o veículo
    saveVehiclesToFile(vehicles); // Salva os dados no arquivo
    res.status(200).json(updatedVehicle); // Retorna o veículo atualizado
  } else {
    res.status(404).json({ message: 'Vehicle not found' });
  }
};

// Delete
const deleteVehicle = (req, res) => {
  const vehicleId = parseInt(req.params.id);
  const vehicles = readVehiclesFromFile(); // Lê os veículos do arquivo
  const vehicleIndex = vehicles.findIndex(v => v.id === vehicleId);
  
  if (vehicleIndex !== -1) {
    vehicles.splice(vehicleIndex, 1); // Remove o veículo
    saveVehiclesToFile(vehicles); // Salva os dados no arquivo
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
