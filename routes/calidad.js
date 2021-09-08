const express = require ('express');
var router = express.Router();
const calidadController = require('../controllers/calidad');
const historialController = require('../controllers/historial');
const notificacionController = require('../controllers/notificacion');
const empleadoController = require("../controllers/empleado");

router.get("/",calidadController.index);
router.post("/cambiarCont", empleadoController.cambiarContraseña);
router.get("/ver/:id", historialController.vistaNotific);
router.post("/ver/:id", notificacionController.leida);

module.exports = router;