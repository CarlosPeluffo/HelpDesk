const Cliente = require("../models").Cliente;
const Empleado = require("../models").Empleado;
const { Op } = require("sequelize");
const moment = require("moment");
const bcrypt = require("bcrypt");

exports.index = function (request, response){
    response.render('registro',{
        mensajeError: request.flash('mensajeError')
    });
}
exports.singup = async (request, response)=>{
    try{
        var empleado = await Empleado.findOne(
            {where:{
                [Op.or]: [{mail: request.body.mail}, 
                        {dni: request.body.dni}]
            }});
        if(empleado){
            request.flash('mensajeError',
            'Registrado como empleado o Mail asociado a un empleado');
            response.redirect("/singup");
        }
        else{
            var salt = await bcrypt.genSalt(10);
            var contraseña = await bcrypt.hash(request.body.contraseña, salt);
            await Cliente.create({
                dni: request.body.dni,
                nombre: request.body.nombre,
                apellido: request.body.apellido,
                mail: request.body.mail,
                contraseña: contraseña,
                celular: request.body.celular,
                estado: false,
                fecha_creacion: moment(new Date).format("YYYY-MM-DD HH:mm:ss")
            });
            request.flash('mensaje', 
            'Enviado correctamente, espere a ser habilitado para acceder');
            response.redirect("/");
        }
    }catch(error){
        request.flash('mensajeError',
        'No se puedo enviar: Usuario o mail ya existente');
        console.log(error);
        response.redirect("/singup");
    }
}