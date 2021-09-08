const Notificacion = require("../models").Notificacion;

exports.leida = async (request, response)=>{
    await Notificacion.update({
        estado: "Atendida"
    },{
        where:{id_notificacion: request.params.id}
    });
    request.flash('mensaje', 'Notificacion Atendida');
    response.redirect("/calidad");
}