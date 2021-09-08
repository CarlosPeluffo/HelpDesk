const Area = require("../models").Area;
const Empleado = require("../models").Empleado;
const Historial = require("../models").Historial;
const Solicitud = require("../models").Solicitud;
const bcrypt = require("bcrypt");
const moment = require("moment");
const {Op} = require("sequelize");

//tareas de empleados
exports.index = async (request, response)=>{
    var empleado = await Empleado.findByPk(request.session.dni,
        {include: Area});
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
    response.render('./empleados/index',{ 
        title: "Area de " + empleado.Area.nombre_area,
        empleado: empleado,
        Solicitud: solicitudes,
        mensaje: request.flash('mensaje'),
        mensajeError: request.flash('mensajeError')
    });    
}
exports.cambiarContraseña = async (request, response)=>{
    var salt = await bcrypt.genSalt(10);
    var empleado = await Empleado.findByPk(request.session.dni);
    var cv = await bcrypt.compare(request.body.antigua, empleado.contraseña);
    if(cv){
        var contraseña = await bcrypt.hash(request.body.nueva, salt);
        await Empleado.update({
            contraseña: contraseña
        },
            {where:{dni: request.session.dni}});
        request.flash('mensaje','Contraseña actualizada correctamente')
        response.redirect("/"+ request.session.rol);
    }
    else{
        request.flash('mensajeError','No se puedo actualizar contraseña')
        response.redirect("/"+ request.session.rol);
    }
}
//gestion de empleados
exports.listar = async (request, response) =>{
    var empleados = await Empleado.findAll({
        include: Area,
        where:{
            dni:{
                [Op.and]:{
                    [Op.ne]: request.session.dni, 
                    [Op.gt]:1
                    }
                }
        }});
    var a = empleados.length;
    response.render("./admin/empleado/index", {
        Empleados: empleados,
        empT: a,
        mensaje: request.flash('mensaje'),
        mensajeError: request.flash('mensajeError')
    });
}
exports.formAgregar = async (request, response) => {
    const areas = await Area.findAll();
    response.render("./admin/empleado/empleadoForm",{ area: areas});
}
exports.agregar = async (request, response)=> {
    var c = request.body.area;
    var sect;
    if(c == 0){
        sect = null;
    }
    else{
        sect = c;
    }
    try{
        var salt = await bcrypt.genSalt(10);
        var contraseña = await bcrypt.hash(request.body.contraseña, salt);
        await Empleado.create({
            dni: request.body.dni,
            id_area: sect,
            nombre: request.body.nombre,
            apellido: request.body.apellido,
            mail: request.body.mail,
            contraseña: contraseña,
            celular: request.body.celular,
            estado: request.body.estado,
            fecha_creacion: moment(new Date).format("YYYY-MM-DD")
        });
        request.flash('mensaje', 'Empleado ingresado correctamente');
        response.redirect("/admin/empleado");
    }catch(SequelizeUniqueConstraintError){
        request.flash('mensajeError', 'No ingresado: Empleado con dni o mail existente');
        response.redirect("/admin/empleado");
    }
}
exports.formActualizar = async (request, response) =>{
    const areas = await Area.findAll();
    const empleado = await Empleado.findByPk(request.params.id);
    response.render("./admin/empleado/empleadoForm",{
        area: areas,
        empleado : empleado,
    })
}
exports.actualizar = async (request, response) =>{
    var c = request.body.area;
    var sect;
    if(c == 0){
        sect = null;
    }
    else{
        sect = c;
    }
    try{
        await Empleado.update({
            dni: request.body.dni,
            id_area: sect,
            nombre: request.body.nombre,
            apellido: request.body.apellido,
            celular: request.body.celular,
            estado: request.body.estado,
        },{
            where: {dni: request.params.id}
        });
        request.flash('mensaje', 'Empleado actualizado correctamente');
        response.redirect("/admin/empleado") ;
    }catch(SequelizeUniqueConstraintError){
        request.flash('mensajeError', 'No actualizado: Dni o mail existente');
        response.redirect("/admin/empleado");
    }
}
exports.desactivar = async (request, response) =>{
    var e = await Empleado.findByPk(request.params.id);
    var estadoNuevo;
    if(e.estado == true){
        estadoNuevo = 0;
        request.flash('mensaje', 'Empleado desactivado');
    }
    else{
        estadoNuevo = 1;
        request.flash('mensaje', 'Empleado activado');
    }
    await Empleado.update({
        estado: estadoNuevo,
    },{
        where: {dni: request.params.id}
    });
    response.redirect("/admin/empleado");
    ;
}
exports.formCambiarDeArea = async (request, response) =>{
    const areas = await Area.findAll();
    const empleado = await Empleado.findByPk(request.params.id,{
        include: Area}
    );
    response.render("./admin/empleado/empleadoArea",{
        nombreA: empleado.id_area ? empleado.Area.nombre_area : "No asignada",
        area: areas,
        empleado : empleado,
    })
}
exports.cambiarDeArea = async (request, response) =>{  
    var c = request.body.area;
    var sect;
    if(c == 0){
        sect = null;
    }
    else{
        sect = c;
    }
    await Empleado.update({
        id_area: sect,
    },{
        where: {dni: request.params.id}
    });
    request.flash('mensaje', 'Empleado actualizado correctamente');
    response.redirect("/admin/empleado");
}