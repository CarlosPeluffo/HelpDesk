const express = require('express');
var router = express.Router();
const helpdeskController = require("../controllers/helpdesk");
const historialController = require("../controllers/historial");
const empleadoController = require("../controllers/empleado");

router.get("/", helpdeskController.index);
router.post("/cambiarCont", empleadoController.cambiarContraseña);
router.get("/:idS/fecha/:f", historialController.obtenerSolicitud);
router.post("/tranferir/:id/fecha/:f", historialController.tranferir);
router.post("/solucionar/:id/fecha/:f", historialController.solucionar);

module.exports = router;