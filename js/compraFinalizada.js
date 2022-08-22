/*Informacion a trer del HTML*/

const informacionDeCompra = JSON.parse(localStorage.getItem("NuevaCompra"));
const informacionCompra = document.getElementById("compraFinalizada__informacionCompra__container");


/*Traer valor de compra para mostrar*/

let valorDeCompra = localStorage.getItem("ValorDeComra");

/*Card dinamica con informacion de compra*/

const { nombre, email, domicilio , numeroDeTarjeta } = informacionDeCompra

html = `<div class="animate__animated animate__jackInTheBox ticket__container">
            <h2>¡Gracias <b>${nombre}</b> por tu compra!</h2>
            <h3>¡El pago de <b>$FALTA EL VALOR ACA</b> ya fue aprobado con la tarjeta <b>${numeroDeTarjeta} </b>¡Que los disfrutes!</h3>
            <p>En las próximas 24hs vas a estar recibiendo un mail a <b>${email}</b> con toda la información restante de la compra y la información que necestias tener para la recepción de tu pedido. Además en el rango de 7 días van a llegar tus productos a <b>${domicilio}</b>.</p>
            <p>¡Que tengas buen día!</p>`

informacionCompra.innerHTML += html;




