function validarArea(){
    var nombre = document.getElementById("nombre").value.trim();
    if(!nombre || nombre.length < 4){
        alert("Ingrese un nombre valido");
        return false;
    }
    else{
        return true;
    }
};
function validarRegistro(){
    var d = document.registro.dni.value;
    var dni = parseInt(d);
    if(!dni || dni<7000000 || dni > 45000000){
        alert('ingrese un dni valido');
        return false;
    }
    var nombre = document.registro.nombre.value.trim();
    if(!nombre || nombre.length < 3){
        alert("Ingrese un nombre valido");
        return false;
    }
    var apellido = document.registro.apellido.value.trim();
    if(!apellido || apellido.length < 3){
        alert("Ingrese un apellido valido");
        return false;
    }
    var contraseña = document.registro.contraseña.value.trim();
    if(!contraseña || contraseña.length < 8 || contraseña.length > 20){
        alert("La contraseña debe tener más de 8 y menos de 20 caracteres");
        return false;
    }
    var mail = document.registro.mail.value.trim();
	 if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(mail)){
		} 
		else {
	   alert("La dirección de email es incorrecta.");
	   return false;
    }
	var c = confirm("Realmente desea enviar los datos de subscripción?");
		return c;
}
function validarContraseña(){
    var contraseña = document.getElementById("nueva").value.trim();
    if(!contraseña || contraseña.length < 8 || contraseña.length > 20){
        alert("La contraseña debe tener más de 8 y menos de 20 caracteres");
        return false;
    }
    var c = confirm("Realmente desea actualizar la contraseña?");
		return c;
}
function validarTextArea(){
    var text = document.getElementById("detalle").value.trim();
    if(!text || text.length < 20 ){
        alert("El detalle debe tener más de 20 caracteres");
        return false;
    }
    var c = confirm("Realmente desea enviar la solicitud?");
		return c;
}
function validarRazon(){
    var text = document.getElementById("razon").value.trim();
    if(!text || text.length < 20 ){
        alert("La razon debe tener más de 20 caracteres");
        return false;
    }
    var c = confirm("Realmente desea transferir la solicitud?");
		return c;
}
function validarSolucion(){
    var text = document.getElementById("solucion").value.trim();
    if(!text || text.length < 20 ){
        alert("El detalle debe tener más de 20 caracteres");
        return false;
    }
    var c = confirm("Realmente desea resolver la solicitud?");
		return c;
}