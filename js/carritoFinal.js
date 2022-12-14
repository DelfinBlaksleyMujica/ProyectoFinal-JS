/*Traer del Local Storage carrito ya existente o en caso de no existir uno ya, crear uno vacio*/

const carrito = JSON.parse(localStorage.getItem("Carrito de compra")) || [];

/*Traaer contenedor del HTML para agregarle contenido dinamico*/ 

const productoInfoContainer = document.getElementById("carritoFinal__productosInfo__container");

/*Funciones de Tabla con productos*/

function contador(producto){
    let contador = carrito.indexOf(producto) + 1;
    return contador;
}

function calcularSubtotal () {
    const valorSubtotal = carrito.reduce((acc , el) => acc + el.precio, 0);
    return valorSubtotal;
}

function calcularTotal(valor) {
    return parseFloat(valor * 1.21);
}

function guardarValorEnLS (clave,valor) {
    localStorage.setItem(clave,JSON.stringify(valor));
}



function removeFromCart (id) {
    for (let index = 0; index < carrito.length; index++) {
        if (carrito[index].id === id) {
        carrito.splice(index, 1)
        productoInfoContainer.innerHTML = ""; 
        localStorage.setItem("Carrito de compra",JSON.stringify(carrito));   
        showItems()
        return     
        }
    }
}

const carritoSubtotalContainer = document.getElementById("carritoFinal__productosSubtotal__container");


function showTotal(carrito) {
    html = `<div>
            <p>Total :$ ${calcularTotal(calcularSubtotal(carrito))} </p>
            </div>`

    carritoSubtotalContainer.innerHTML = html;
}


function showItems () {
    for (const producto of carrito) {
        const {id,nombre,precio,img} = producto
        
    html = `
    <ul class="compraFinal__informacionProducto__container">
            <li>${contador(producto)})</li>
            <li>${nombre}</li>
            <li><img src="${img}"/></li>
            <li>$${precio}</li>
            <li>
                <div>
                <button type ="button" onClick = "removeFromCart(${id})" class="btnEliminar" value="Eliminar">Eliminar</button>
                </div>
            </li>
            

    </ul> 
    `



    productoInfoContainer.innerHTML += html;
}

showTotal();

}

showItems();



//INFORMACION DE PAGO

/*Traer contenedor del HTML para agregarle contenido dinamico*/

const informacionDePagoContainer = document.getElementById("carritoFinal__tarjeta__container");


calcularTotal(calcularSubtotal(carrito));



/*Infomacion del cliente que realiza la compa*/
const nombreReceptor = document.getElementById("informacionDeEntrega__nombreReceptor"),
emailReceptor = document.getElementById("informacionDeEntrega__email"),
telefonoReceptor = document.getElementById("informacionDeEntrega__telefono"),
domicilioReceptor = document.getElementById("informacionDeEntrega__domicilio"),
numeroDeTarjetaReceptor = document.getElementById("numeroDeTarjeta"),
btnConfirmarCompra = document.getElementById("btnConfirmarCompra");



/*Funcion para que el cliente no pueda realizar la compra sin poner todos los datos*/

function validarDatos(){
    if ((nombreReceptor.value != "") && (emailReceptor.value != "") && (telefonoReceptor.value != "") && (domicilioReceptor.value != "" ) && (numeroDeTarjetaReceptor.value != "")) {
        guardarLocal("NuevaCompra", JSON.stringify(tomarDatosCompra()));
        window.location.href = "../pages/compraFinalizada.html";
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Campo/s Vacio/s',
            html: '<p class="texto__completarCamposRegistro"> Para poder finalizar y disfrutar de tu compra  debes completar todos los datos personales y de tarjeta </p>',
            })
    }
}

/*Recepcion de datos del nuevo/viejo cliente que este realizando la compra*/

class NuevoCliente {
    constructor(nombre,email,telefono,domicilio,numeroDeTarjeta){
        this.nombre = nombre,
        this.email = email,
        this.telefono = telefono,
        this.domicilio = domicilio,
        this.numeroDeTarjeta = numeroDeTarjeta;
    }
}

function tomarDatosCompra() {
    let nombre = nombreReceptor.value;
    let email = emailReceptor.value;
    let telefono = telefonoReceptor.value;
    let domicilio = domicilioReceptor.value;
    let numeroDeTarjeta = numeroDeTarjetaReceptor.value;

    return new NuevoCliente(nombre,email,telefono,domicilio,numeroDeTarjeta)
}

const guardarLocal = (clave,valor) => {
    return localStorage.setItem(clave,valor);
}


/*Funcion para vaciar el carrito una vez que el usuario finaliza con su compra*/

function vaciarCarrito(carrito) {
    if ((nombreReceptor.value != "") && (emailReceptor.value != "") && (telefonoReceptor.value != "") && (domicilioReceptor.value != "" ) && (numeroDeTarjetaReceptor.value != "")) {
        carrito.splice(0, carrito.length);
        guardarLocal("Carrito de compra",JSON.stringify(carrito));
    }
    
}


/*Funcionabilidad para no permitir que el usuario finalice la compra con el carrito vacio*/

carrito.length == 0 ? btnConfirmarCompra.disabled = true : btnConfirmarCompra.disabled = false;



/*Boton para finaliza con la compra cargado con funciones que controlan su ejecucion*/

btnConfirmarCompra.addEventListener("click", (e) => {
    e.preventDefault();
    guardarValorEnLS("ValorDeCompra",calcularTotal(calcularSubtotal(carrito)));
    vaciarCarrito(carrito);
    validarDatos();
})



