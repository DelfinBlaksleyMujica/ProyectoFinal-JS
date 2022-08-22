//CARRITO DE COMPRAS

/*Chequeo de existencia de carrito previo en el Local Storage o creacion de uno vacio*/

const carrito = JSON.parse(localStorage.getItem("Carrito de compra")) || [];


/*Contenedor a traer del HTML*/

const cardsContainer = document.getElementById("merchandise__cards__container")

/*Logo de carrito de compras y funciones de agregado*/

const iconCart = document.querySelector("#iconCart")
let cartNumber = document.createElement("span")
cartNumber.innerText = carrito.length;
iconCart.appendChild(cartNumber)

function addToCart (id) {
    carrito.push ( catalogo.find ( r => r.id == id ))
    cartNumber.innerText = carrito.length;
    guardarLocal("Carrito de compra",JSON.stringify(carrito));
    
    Toastify({

        text: "Se agrego al carrito exitosamente",        
        duration: 16000,
        close: true,
        gravity: "bottom",
        position: "right", 
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
        background: "greenyellow",
        
        }}).showToast();
    
}

/*Armado de cards*/

async function fetchProductos() {
    const respuesta = await fetch("../data/productos.json")
    return await respuesta.json()
}



function mostrarCatalogo() {
    for (const producto of catalogo) {
        const {id , nombre , precio , img} = producto
        const productosHTML = `
        <div class="">
        <div class="card">
            <div class="card-image">

                <img src="${img}">
            
            </div>
    
            <div class="card-content">
    
                <span class="card-title">${nombre.toUpperCase()}</span>
                <p>$${precio}</p>
    
            </div>
        
            <div class="card-action">
                <button type="button"   onClick="addToCart(${id})" class="btnComprar" value="Comprar">Comprar</button>
            </div>

        </div>
    </div>` 

    cardsContainer.innerHTML += productosHTML;
    }
}

let catalogo = []

fetchProductos().then(productos => {
    catalogo = productos
    mostrarCatalogo() 
})



//Almacenar Carrito De Compras en Local Storage

const guardarLocal = (clave, valor) => {
    localStorage.setItem(clave,valor)
};


//Buscdor

const search = document.getElementById("buscador");


function filtrarProductos(filtro){
    let filtrado = catalogo.filter((el) => {
        return el.nombre.includes(filtro);
    });
    return filtrado;
};


search.addEventListener("keyup" , (e) => {
    e.preventDefault();
    cardsContainer.innerHTML = "";
    let filtro = filtrarProductos(search.value.toUpperCase());
    let html = filtro.map ( (producto) => {
        const {id,nombre,precio,img} = producto
        return (
            `
            <div class="">
                <div class="card">
                    <div class="card-image">
    
                        <img src="${img}">
                    
                    </div>
            
                    <div class="card-content">
            
                        <span class="card-title">${nombre.toUpperCase()}</span>
                        <p>$${precio}</p>
            
                    </div>
                
                    <div class="card-action">
                        <button type="button"   onClick="addToCart(${id})" class="btnComprar" value="Comprar">Comprar</button>
                    </div>
    
                </div>
            </div>`
        )
    })
    
    cardsContainer.innerHTML = html
    
})


