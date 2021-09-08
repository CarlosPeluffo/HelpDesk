const Empleado = require('../models').Empleado;
const Notificaciones = require('../models').Notificacion;

exports.index = async (request, response) =>{
    var empleado = await Empleado.findByPk(request.session.dni);
    var notificaciones = await Notificaciones.findAll( {where:{estado:"Pendiente"}});
    response.render("./calidad/index",{
        title: "Area de Calidad",
        empleado: empleado,
        notific: notificaciones,
        a:  notificaciones.length,
        mensaje: request.flash('mensaje'),
        mensajeError: request.flash('mensajeError')
    });
}