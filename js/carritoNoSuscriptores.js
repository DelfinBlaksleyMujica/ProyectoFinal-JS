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

function addToCartNoSuscriptores (id) {
    carrito.push ( catalogo.find ( r => r.id == id ))
    cartNumber.innerText = carrito.length;
    guardarLocal("Carrito de compra",JSON.stringify(carrito));
    console.log(carrito);
    
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

let catalogo = [];

const armarCards = async () => {
    const respuesta = await fetch("../data/productos.json")
    const data = await respuesta.json()

    catalogo = data.map ( (producto) => {
        return {
            id: producto.id, 
            nombre: producto.nombre,
            precio : producto.precio * 1.25,
            img:producto.img 
        }
    })

    let html = catalogo.map ( (producto) => {
        return (
            `
            <div class="">
                <div class="card">
                    <div class="card-image">
    
                        <img src="${producto.img}">
                    
                    </div>
            
                    <div class="card-content">
            
                        <span class="card-title">${producto.nombre.toUpperCase()}</span>
                        <p>$${producto.precio}</p>
            
                    </div>
                
                    <div class="card-action">
                        <button type="button"   onClick="addToCartNoSuscriptores(${producto.id})" class="btnComprar" value="Comprar">Comprar</button>
                    </div>
    
                </div>
            </div>`
        )

})

cardsContainer.innerHTML = html

}

armarCards();




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
        return (
            `
            <div class="">
                <div class="card">
                    <div class="card-image">
    
                        <img src="${producto.img}">
                    
                    </div>
            
                    <div class="card-content">
            
                        <span class="card-title">${producto.nombre.toUpperCase()}</span>
                        <p>$${producto.precio}</p>
            
                    </div>
                
                    <div class="card-action">
                        <button type="button"   onClick="addToCartNoSuscriptores(${producto.id})" class="btnComprar" value="Comprar">Comprar</button>
                    </div>
    
                </div>
            </div>`
        )
    })
    
    cardsContainer.innerHTML = html
    
})




































/*



const productos = [
    {id: 1, nombre: "REMERA ACTIVA 1", precio: 3300, img:"../img/remera1Activa.png"},
    {id: 2, nombre: "REMERA ACTIVA 2", precio:3800,img:"../img/remera2Activa.png"},
    {id: 3, nombre:"REMERA ACTIVA 3", precio: 4000, img:"../img/remera3Activa.png"},
    {id: 4, nombre: "BUZO ACTIVA 1", precio: 7000, img: "../img/buzo1Activa.png"},
    {id: 5, nombre:"BUZO ACTIVA 2", precio:7800, img:"../img/buzo2Activa.png"},
    {id: 6, nombre: "BUZO ACTIVA 3", precio: 9900, img:"../img/buzo3Activa.png"},
    {id: 7, nombre: "PERLAS ACTIVA", precio: 14700, img:"../img/perlasActiva.png"},
    {id: 8, nombre: "COLGANTE ACTIVA", precio: 10000, img:"../img/colganteActiva.png" },
];



const productosSinDescuento = productos.map((el) =>{
    return {
        id: el.id,
        nombre: el.nombre,
        precio: el.precio * 1.3,
        img : el.img
    }
})


const carrito = []

const cardsContainer = document.getElementById("merchandise__cards__container")

const iconCart = document.querySelector("#iconCart")
let cartNumber = document.createElement("span")
cartNumber.innerText = 0
iconCart.appendChild(cartNumber)

function addToCart (id) {
    carrito.push ( productos.find ( r => r.id == id ))
    cartNumber.innerText = carrito.length;
    guardarLocal("Carrito de compra",JSON.stringify(carrito));
    console.log(carrito);
    
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



//Despliegue de productos en html dependiente de array de productos  



let html = productosSinDescuento.map ( (producto) => {
    return (
        `
        <div class="">
            <div class="card">
                <div class="card-image">

                    <img src="${producto.img}">
                
                </div>
        
                <div class="card-content">
        
                    <span class="card-title">${producto.nombre.toUpperCase()}</span>
                    <p>$${producto.precio}</p>
        
                </div>
            
                <div class="card-action">
                    <button type="button"   onClick="addToCart(${producto.id})" class="btnComprar" value="Comprar">Comprar</button>
                </div>

            </div>
        </div>`
    )
})

cardsContainer.innerHTML = html





//Almacenar Carrito De Compras en Local Storage

const guardarLocal = (clave, valor) => {
    localStorage.setItem(clave,valor)
};


//Buscdor

const search = document.getElementById("buscador");


function filtrarProductos(filtro){
    let filtrado = productos.filter((el) => {
        return el.nombre.includes(filtro);
    });
    return filtrado;
};


search.addEventListener("keyup" , (e) => {
    e.preventDefault();
    cardsContainer.innerHTML = "";
    let filtro = filtrarProductos(search.value.toUpperCase());
    let html = filtro.map ( (producto) => {
        return (
            `
            <div class="">
                <div class="card">
                    <div class="card-image">
    
                        <img src="${producto.img}">
                    
                    </div>
            
                    <div class="card-content">
            
                        <span class="card-title">${producto.nombre.toUpperCase()}</span>
                        <p>$${producto.precio}</p>
            
                    </div>
                
                    <div class="card-action">
                        <button type="button"   onClick="addToCart(${producto.id})" class="btnComprar" value="Comprar">Comprar</button>
                    </div>
    
                </div>
            </div>`
        )
    })
    
    cardsContainer.innerHTML = html
    
})

*/