// routes/vehicleRoutes.js
const express = require('express');
const router = express.Router();

// Importando os controladores
const vehicleController = require('../controllers/vehicleController');

// Definindo as rotas e associando as funções do controlador
router.get('/vehicles', vehicleController.getAllVehicles);
router.get('/vehicles/:id', vehicleController.getVehicleById);
router.post('/vehicles', vehicleController.createVehicle);
router.put('/vehicles/:id', vehicleController.updateVehicle);
router.delete('/vehicles/:id', vehicleController.deleteVehicle);

module.exports = router;
