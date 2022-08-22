//REGISTRO USUARIOS

const usuarios = [];

/*Funciones de usuario*/

class NuevoUsuario{
    constructor(nombre,email,edad,sexo,barrio,nombreDeUsuario,contrasenia){
        this.nombre = nombre;
        this.email = email;
        this.edad = parseInt(edad);
        this.sexo = sexo;
        this.barrio = barrio;
        this.nombreDeUsuario = nombreDeUsuario;
        this.contrasenia = contrasenia;
    }
}

function crearUsuario(nombre,email,edad,sexo,barrio,nombreDeUsuario,contrasenia){
    const usuario = new NuevoUsuario (nombre,email,edad,sexo,barrio,nombreDeUsuario,contrasenia);
    return usuario;
}

function cargarUsuario(usuario){
    usuarios.push(usuario);
}

//Almacenar Carrito De Compras en Local Storage

const guardarLocal = (clave, valor) => {
    localStorage.setItem(clave,valor)
};


/*Registro de nuevos usuarios*/


const btnRegistrarse = document.getElementById("registrarse");



btnRegistrarse.addEventListener("click", async () => {
    const { value: formValues } = await Swal.fire({  
    title: 'Suscribite!',
    background:'white ',   
    html:
        '<input id="swal-input1" class="swal-input" placeholder="Ingresa tu nombre" required>' +
        '<input id="swal-input2" class="swal-input" placeholder="Ingresa tu email" required>' +
        '<input id="swal-input3" class="swal-input" placeholder="Ingresa tu edad" required>' +
        '<input id="swal-input4" class="swal-input" placeholder="Ingresa tu sexo" required>' +
        '<input id="swal-input5" class="swal-input" placeholder="Ingresa tu barrio" required>' +
        '<input id="swal-input6" class="swal-input" placeholder="Nombre de usuario" required>' + 
        '<input id="swal-input7" type="password"  class="swal-input" placeholder="Ingresa tu contraseña" required>',
    showCancelButton: true,
    confirmButtonText: 'Registrarme',
    cancelButtonText: 'Salir!',
    focusConfirm: false,
    preConfirm: () => {
        return [
        nombre = document.getElementById('swal-input1').value,
        email = document.getElementById('swal-input2').value,
        edad = document.getElementById('swal-input3').value,
        sexo = document.getElementById('swal-input4').value,
        barrio = document.getElementById('swal-input5').value,
        nombreDeUsuario = document.getElementById('swal-input6').value,
        contrasenia = document.getElementById('swal-input7').value,
        ]
    }
    }).then((result) => {
        if ((result.isConfirmed) && (nombre != "") && (email != "") && (edad != "") && (sexo != "") && (barrio != "") && (nombreDeUsuario != "") && (contrasenia != "")) {
            cargarUsuario(crearUsuario(nombre,email,edad,sexo,barrio,nombreDeUsuario,contrasenia));
            guardarLocal("Suscriptores", JSON.stringify(usuarios));
            console.log(usuarios);
            Swal.fire({
                title:"¡Registrado exitosamente!",
                icon: 'success',
            })

        }
        else{
        Swal.fire({
            icon: 'error',
            title: '¡Todos los campos deben estar completos!',
            html: '<p class="texto__completarCamposRegistro">Para lograr registrarte debes completar todos los campos y presionar el boton de "Registrarme" para finalizar.',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
            })}
});
})



        
    