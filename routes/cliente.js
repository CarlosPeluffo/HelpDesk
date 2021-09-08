const express = require('express');
var router = express.Router();
const clienteController = require('../controllers/cliente');
const solicitudController = require('../controllers/solicitud');
const historialController = require('../controllers/historial');

router.get("/", clienteController.index);
router.get("/solicitud", clienteController.formSolicitud);
router.post("/cambiarCont", clienteController.cambiarContraseña);
router.post("/solicitud", solicitudController.crearSolicitud);
router.get("/solicitud/:id", historialController.listarSolicitud);
router.get("/actualizar", clienteController.formActualizar);
router.put("/actualizar/:id", clienteController.actualizar);

module.exports = router;