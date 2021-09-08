const Empleado = require("../models").Empleado;
const Historial = require("../models").Historial;
const Area = require("../models").Area;
const Solicitud = require("../models").Solicitud;

exports.index = async (request, response)=>{
    var empleado = await Empleado.findByPk(request.session.dni);
    var solicitudes = await Historial.findAll({
        include:[{
            model: Solicitud, 
        },{
            model: Area,
        }],
        where:{ 
            id_area: request.session.area,
            fecha_egreso : null
        }
    })
    response.render('./helpdesk/index',{ 
        title: "Area de Help Desk",
        empleado: empleado,
        Solicitud: solicitudes,
        mensaje: request.flash('mensaje'),
        mensajeError: request.flash('mensajeError')
     });
}
