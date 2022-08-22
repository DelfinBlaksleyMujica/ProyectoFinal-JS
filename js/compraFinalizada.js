/*Informacion a trer del HTML*/

const informacionDeCompra = JSON.parse(localStorage.getItem("NuevaCompra"));
const informacionCompra = document.getElementById("compraFinalizada__informacionCompra__container");


/*Card dinamica con informacion de compra*/

html = `<div class="animate__animated animate__jackInTheBox ticket__container">
            <h2>¡Gracias <b>${informacionDeCompra["nombre"]}</b> por tu compra!</h2>
            <h3>¡El pago con la tarjeta <b>${informacionDeCompra["numeroDeTarjeta"]} </b> fue realizado con éxito!</h3>
            <p>En las próximas 24hs vas a estar recibiendo un mail a <b>${informacionDeCompra["email"]}</b> con toda la información que necestias tener para la recepción de tu pedido. Además en el rango de 7 días van a llegar tus productos a <b>${informacionDeCompra["domicilio"]}</b>.</p>
            <p>¡Que tengas buen día!</p>`

informacionCompra.innerHTML += html;




