const Area = require("../models").Area;
const Cliente = require("../models").Cliente;
const Empleado = require("../models").Empleado;
const Historial = require("../models").Historial;
const Notificacion = require("../models").Notificacion;
const Solicitud = require("../models").Solicitud;
const { Op } = require("sequelize");
const moment = require("moment");

exports.listarSolicitud = async (request, response)=>{
    var solicitud = await Historial.findAll({
        include: Area,
        where:{ id_solicitud: request.params.id}
    });
    response.render("./cliente/seguimiento",{ 
        solicitudes: solicitud
    });
}
exports.obtenerSolicitud = async (request, response)=>{
    var areas = await Area.findAll({where:{id_area: {
        [Op.not]: request.session.area,},
        nombre_area:{[Op.and]:[
        {[Op.ne]:"Gestion"}, {[Op.ne]:"Calidad"}]}
    }});
    var s = await Solicitud.findByPk(request.params.idS,{include: Cliente});
    var solicitud = await Historial.findOne({
        include:[{
            model: Solicitud,
        },{
            model: Area,
        }],
        where:{ 
            id_area: request.session.area,
            id_solicitud: request.params.idS,
            fecha_ingreso: request.params.f
        }
    });
    if(request.session.rol == "helpdesk"){
        response.render("./helpdesk/tareas", {
            solic: solicitud,
            area: areas,
            s: s
        });
    }
    else{
        response.render("./empleados/tareas", {
            solic: solicitud,
            area: areas,
            s: s
        });
    }
}
exports.tranferir = async (request, response)=>{
    await Historial.create({
        fecha_ingreso: moment(new Date).format("YYYY-MM-DD HH:mm:ss"),
        id_area: request.body.area,
        id_solicitud: request.params.id,
        detalle_razon: request.body.razon,
        estado: "Pendiente"
    });
    await Historial.update({
        detalle_razon: request.body.razon,
        fecha_egreso: moment(new Date).format("YYYY-MM-DD HH:mm:ss"),
        dni_empleado: request.session.dni
    },{
        where:{
            id_area: request.session.area,
            id_solicitud: request.params.id,
            fecha_ingreso: request.params.f
        }
    });
    if(request.session.rol == "helpdesk"){
        await Solicitud.update({
            prioridad: request.body.prioridad
        },{
            where:{id_solicitud: request.params.id}
        });
    }
    request.flash('mensaje', 'Transferido correctamente');
    response.redirect("/" + request.session.rol);
}
exports.solucionar = async(request, response)=>{
    await Historial.update({
        detalle_solucion: request.body.solucion,
        fecha_egreso: moment(new Date).format("YYYY-MM-DD HH:mm:ss"),
        dni_empleado: request.session.dni,
        estado: request.body.estado,
        detalle_razon: null
    },{
        where:{
            id_area: request.session.area,
            id_solicitud: request.params.id,
            fecha_ingreso: request.params.f
        }
    });
    if(request.session.rol == "helpdesk"){
        await Solicitud.update({
            prioridad: request.body.prioridad,
        },{
            where:{id_solicitud: request.params.id}
        });
    }
    request.flash('mensaje', 'Solucionado correctamente');
    response.redirect("/" + request.session.rol);
}
exports.vistaNotific = async (request, response)=>{
    var notific = await Notificacion.findByPk(request.params.id);
    var solicitud = await Historial.findAll({
        include:[{
            model: Solicitud,
        },{
            model: Area,
        }],
        where:{ 
            id_solicitud: notific.id_solicitud_historial,
        }});
        response.render("./calidad/atender", {
            notif: notific,
            solic: solicitud
        });
}
exports.buscar = async (request, response)=>{
        var s = await Solicitud.findOne({
            where:{nro_ticket: request.body.ticket}
        });
        if(s){
            var solicitud = await Historial.findAll({
                include: Area,
                where:{ id_solicitud: s.id_solicitud}
            });
            response.render("./cliente/seguimiento",{ 
                solicitudes: solicitud
            });
        }
        else{
            request.flash('mensajeError', 'Solicitud no encontrada');
            response.redirect("/");
        }
}