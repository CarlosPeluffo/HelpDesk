const Solicitud = require("../models").Solicitud;
const moment = require("moment");

exports.crearSolicitud = async (request, response)=>{
    var ticket = Math.floor(Math.random()*(2147483646+1));
    await Solicitud.create({
        dni_cliente : request.session.dni,
        detalle: request.body.detalle,
        tipo: request.body.tipo,
        fecha_solicitud: moment(new Date).format("YYYY-MM-DD HH:mm:ss"),
        prioridad: null,
        nro_ticket: ticket
    });
    request.flash('mensaje', 'Solicitud creada correctamente');
    request.flash('ticket', 'Nro de ticket de seguimiento: ' + ticket );
    response.redirect('/cliente');
}