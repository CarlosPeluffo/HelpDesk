const express = require('express');
var router = express.Router();
const adminController = require('../controllers/admin');
const areaController = require('../controllers/area');
const empleadoController = require('../controllers/empleado');
const clienteController = require('../controllers/cliente');

//index Administrador
router.get("/", adminController.index);
router.post("/cambiarCont", empleadoController.cambiarContraseña);
//Gestion de Clientes
router.get("/cliente", clienteController.listarDesac);
router.get("/cliente/:id", clienteController.desactivar);
//Gestion de Areas
router.get("/area", areaController.listar);
router.get("/area/insertar", areaController.formAgregar);
router.post("/area", areaController.agregar);
router.get("/area/:id", areaController.formActualizar);
router.put("/area/:id", areaController.actualizar);
//Gestion de Empleados
router.get("/empleado", empleadoController.listar);
router.get("/empleado/insertar", empleadoController.formAgregar);
router.post("/empleado", empleadoController.agregar);
router.get("/empleado/:id", empleadoController.formActualizar);
router.get("/empleado/e/:id", empleadoController.desactivar);
router.put("/empleado/:id", empleadoController.actualizar);
router.get("/empleado/a/:id", empleadoController.formCambiarDeArea);
router.put("/empleado/a/:id", empleadoController.cambiarDeArea);



module.exports = router;