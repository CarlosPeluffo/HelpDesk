const Cliente = require("../models").Cliente;
const Solicitud = require("../models").Solicitud;
const bcrypt = require("bcrypt");

//tareas de clientes

exports.index = async (request, response) =>{
    var cliente = await Cliente.findByPk(request.session.dni);
    var solicitudes = await Solicitud.findAll(
        {where:{dni_cliente : request.session.dni }
    });
    response.render("./cliente/index",{
        title: "Help Desk",
        cliente: cliente,
        solicitud: solicitudes,
        mensaje: request.flash('mensaje'),
        mensajeError: request.flash('mensajeError'),
        ticket: request.flash('ticket')
    });
}
exports.formSolicitud = function(request, response){
    response.render('./cliente/formSolicitud');
}
exports.formActualizar = async (request, response) =>{
    var cliente = await Cliente.findByPk(request.session.dni);
    response.render("./cliente/formActualizar", {cliente: cliente});
}
exports.actualizar = async (request, response) =>{
    await Cliente.update({
        nombre: request.body.nombre,
        apellido: request.body.apellido,
        celular: request.body.celular
    },
    {where:
        {dni: request.session.dni}
    });
    request.flash('mensaje', 'Usuario actualizado correctamente');
    response.redirect("/cliente");
}
exports.cambiarContraseña = async (request, response)=>{
    var salt = await bcrypt.genSalt(10);
    var cliente = await Cliente.findByPk(request.session.dni);
    var cv = await bcrypt.compare(request.body.antigua, cliente.contraseña);
    if(cv){
        var contraseña = await bcrypt.hash(request.body.nueva, salt);
        await Cliente.update({
            contraseña: contraseña
        },
            {where:{dni: request.session.dni}});
        request.flash('mensaje','Contraseña actualizada correctamente')
        response.redirect("/cliente");
    }
    else{
        request.flash('mensajeError','No se puedo actualizar la contraseña')
        response.redirect("/cliente");
    }
}
//Gestion de clientes

exports.listarDesac = async (request, response) =>{
    var clientes = await Cliente.findAll();
    var a = clientes.length;
    response.render("./admin/cliente/index",{
        Clientes: clientes,
        cliT: a,
        mensaje: request.flash('mensaje')
    });
}
exports.desactivar = async (request, response) =>{
    var e = await Cliente.findByPk(request.params.id);
    var estadoNuevo;
    if(e.estado == true){
        estadoNuevo = 0;
        request.flash('mensaje', 'Cliente Desactivado');
    }
    else{
        estadoNuevo = 1;
        request.flash('mensaje', 'Cliente Activado');
    }
    await Cliente.update({
        estado: estadoNuevo,
    },{
        where: {dni: request.params.id}
    });
    response.redirect("/admin/cliente");
}