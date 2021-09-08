const Empleado = require("../models").Empleado;
exports.index = async (request, response)=>{
    var empleado = await Empleado.findByPk(request.session.dni);
    response.render('./admin/index',{ 
        title: "Area de Gestión",
        empleado: empleado,
        mensaje: request.flash('mensaje'),
        mensajeError: request.flash('mensajeError')
    });
}