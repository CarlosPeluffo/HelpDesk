var express = require('express');
var router = express.Router();
const loginController = require("../controllers/login");
const singupController = require("../controllers/singup");
const historialController = require("../controllers/historial");

router.get('/', function(request, response) {
  response.render('index', { 
    title: 'Help Desk',
    mensaje: request.flash('mensaje'),
    mensajeError: request.flash('mensajeError')
  });
});

router.get('/login', loginController.index);
router.post('/login', loginController.auth);
router.get('/logout', loginController.salir);

router.get('/singup', singupController.index);
router.post('/singup', singupController.singup);

router.post('/seguir', historialController.buscar);

module.exports = router;