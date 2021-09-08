exports.permiso = function(request, response, next){
    if(request.session.loggedin){
        return next();
    }
    else{
        response.redirect("/");
    }
}
exports.admin = function(request, response, next){
    if(request.session.rol == "admin"){
        return next();
    }
    else{
        response.redirect("/" + request.session.rol);
    }
}
exports.helpdesk = function(request, response, next){
    if(request.session.rol == "helpdesk"){
        return next();
    }
    else{
        response.redirect("/" + request.session.rol);
    }
}
exports.empleado = function(request, response, next){
    if(request.session.rol == "empleado"){
        return next();
    }
    else{
        response.redirect("/" + request.session.rol);
    }
}
exports.cliente = function(request, response, next){
    if(request.session.rol == "cliente"){
        return next();
    }
    else{
        response.redirect("/" + request.session.rol);
    }
}
exports.calidad= function(request, response, next){
    if(request.session.rol == "calidad"){
        return next();
    }
    else{
        response.redirect("/" + request.session.rol);
    }
}