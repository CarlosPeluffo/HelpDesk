const Area = require("../models").Area;
const {Op} = require("sequelize");

exports.listar = async (request, response) =>{
    const areas = await Area.findAll({
        where:{id_area: {[Op.gt]: 3}}
    });
    var a = areas.length;
    response.render("./admin/area/index", {
        Areas: areas,
        areaT: a,
        mensaje: request.flash('mensaje'),
        mensajeError: request.flash('mensajeError')
    });
}
exports.formAgregar = function(request, response){
    response.render("./admin/area/areaForm",{});
}
exports.agregar = async (request, response) => {
    try{
        await Area.create({
            nombre_area: request.body.nombre,
        });
        request.flash('mensaje', 'Ingresada correctamente');
        response.redirect("/admin/area");
    }catch(SequelizeUniqueConstraintError){
        request.flash('mensajeError', 'No ingresada: Nombre ya existe');
        response.redirect("/admin/area");
    }
}
exports.formActualizar = async (request, response) =>{
    var areaR = await Area.findByPk(request.params.id);
    response.render("./admin/area/areaForm",{
        area: areaR,
    });
}
exports.actualizar = async(request, response)=>{
    try{
        await Area.update({
            nombre_area: request.body.nombre,
        },{
            where: {id_area: request.params.id}
        });
            request.flash('mensaje', 'Actualizada correctamente');
            response.redirect("/admin/area");
    }catch(SequelizeUniqueConstraintError){
        request.flash('mensajeError', 'No actualizado: Nombre ya existe');
        response.redirect("/admin/area");
    }
}