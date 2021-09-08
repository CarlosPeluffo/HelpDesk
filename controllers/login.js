const Cliente = require("../models").Cliente;
const Empleado = require("../models").Empleado;
const Area = require("../models").Area;
const bcrypt = require("bcrypt");

exports.index = function(request, response){
    response.render("login",{
        title: "Login",
        mensajeError: request.flash('mensajeError')
    });
}
exports.auth = async (request, response) =>{
    var mailR = await request.body.mail;
    var contraseñaR = await request.body.contraseña;
    if(mailR && contraseñaR){
        //validando cliente:
        var user = await Cliente.findOne({
            where:{mail: mailR}
        });
        if(user){
            var userA = await bcrypt.compare(contraseñaR, user.contraseña);
        }
        //validando empleado:
        var user2 = await Empleado.findOne({
            include: Area,
            where:{mail: mailR}});
        if(user2){
            var user2A= await bcrypt.compare(contraseñaR, user2.contraseña);
        }
        //Redirigiendo al cliente
        if(user && userA){
            if(user.estado == false){
                request.flash('mensajeError',
                'Usuario NO habitado. Si se registro hace poco deberá esperar a ser habilitado');
                response.redirect("/login");
            }
            else{
            request.session.loggedin = true;
            request.session.user = user.nombre;
            request.session.dni = user.dni;
            request.session.rol = "cliente";
            response.redirect("/cliente");
            }
        }
        //Redirigiendo al empleado

        else if(user2 && user2A){
            if(user2.estado == false || user2.id_area == null){
                request.flash('mensajeError', 'Usuario NO habitado. Comuniquese con Area Gestion');
                response.redirect("/login");
            }
            else{
                request.session.loggedin = true;
                request.session.user = user2.nombre;
                request.session.dni = user2.dni;
                request.session.area = user2.id_area;
                if(user2.Area.nombre_area == "Gestion"){
                    request.session.rol = "admin";
                    response.redirect("/admin");
                }
                else if(user2.Area.nombre_area == "Help Desk"){
                    request.session.rol = "helpdesk";
                    response.redirect("/helpdesk");
                }
                else if(user2.Area.nombre_area == "Calidad"){
                    request.session.rol = "calidad";
                    response.redirect("/calidad");
                }
                else{
                    request.session.rol = "empleado";
                    response.redirect("/empleado");
                }
            }
        }
        else{
            request.flash('mensajeError', 'Email y/o Contraseña INCORRECTO');
            response.redirect("/login");
        }
    }
    else{
        request.flash('mensajeError', 'Por favor ingrese Email y Contraseña');
        response.redirect("/login");
    }
}
exports.salir = function (request, response) {
    request.session.destroy();
    response.render("logout",{title: "Logout"});
}
