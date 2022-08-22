/*Elementos a traer del HTML*/

const btnIngresar = document.getElementById("ingresar"),
user = document.getElementById("user"),
pass = document.getElementById("pass"),
check = document.getElementById("recordar"),
btnIngresoSinRegistro = document.querySelector("#btnNoRegistrarse");


/*Verificacion de existencia de usuario*/

function iniciarSesion(usuario){
    let userFound = usuario.find((usuario) => {
        const {nombreDeUsuario,contrasenia} = usuario
        return nombreDeUsuario == user.value && contrasenia == pass.value;
    })
    if (userFound) {
        sessionStorage.setItem("Usuario en sesion",JSON.stringify(usuario));
        window.location.href = "./pages/productosParaSocios.html"
    }
    if ((user.value == "") || (pass.value == "") ) {
        Swal.fire({
            position: 'top-center',
            icon: 'error',
            title: 'Campo/s vacio/s',
            showConfirmButton: false,
            timer: 1500
            })
    }
    else{
        Swal.fire({
            icon: 'error',
            title: '¡Not part of the crew!',
            html: '<p class="texto__completarCamposRegistro">El usuario y la contraseña no coinciden con ningún usuario</p>',
            width: 500,
        })
    }
    

    return userFound;
}


/*Traer informacion de los usuario guardados en Local Storage*/

function recuperarLS() {
    let datos = JSON.parse ( localStorage.getItem("Suscriptores"));
    return datos;
}

const usuarioLS = recuperarLS();


/*Botones para ingresos a ver el merchandise*/

btnIngresar.addEventListener("click", (e) => {
    e.preventDefault();
    iniciarSesion(usuarioLS);
});


btnIngresoSinRegistro.addEventListener("click" , (e) => {
    e.preventDefault();
    window.location.href = "./pages/carritoNoSuscriptores.html"
})


