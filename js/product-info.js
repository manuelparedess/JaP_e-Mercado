let productInfo
let comments
let indexRelatedProducts = []
let allProducts = []

//Funcion que muestra la informacion del producto
function showInfo(array) {

    //Defino el carrousel de imagenes para despues agregarlo con DOM
    let carrousel = `
    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="4"></li>
        </ol>
        <div class="carousel-inner">
            <div class="carousel-item active">
                <img src="`+ array.images[0] + `" class="d-block w-100">
            </div>
    `
    //Con un for recorro el array donde se encuentran las imagenes del producto y l
    //las voy agregando al carrousel
    for (let i = 1; i < array.images.length; i++) {

        carrousel += `
            <div class="carousel-item">
                <img src="`+ array.images[i] + `" class="d-block w-100 rounded">
            </div>
    `
    }

    carrousel += `
        </div>
        <a class="left carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="right carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
    </div>`

    document.getElementById("product-images").innerHTML = carrousel

    //Defino toda la info del producto para despues agregarla con DOM
    let info = `
    <div class="container bg-light shadow py-3">
        <div class="row px-3 d-flex">
            <small class="text-secondary">Categoria: <a href="category-info.html">`+ array.category + `</a> &nbsp&nbsp|&nbsp&nbsp Vendidos: ` + array.soldCount + `</small> 
        </div>
        <div class="row mt-2 px-3 d-flex">
            <h2 class=""><b>`+ array.name + `</b></h2>
        </div>
        <div class="row mt-3 px-3 d-flex">
            <h5 class="d-inline mr-1" style="font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;">Precio:</h5>
            <h3 class="d-inline text-success" style="font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;">$ `+ array.cost + ` <span class="h6 text-dark">` + array.currency + `</span></h3>
        </div>
        <hr>
        <div class="row mt-2 px-3 d-flex justify-content-center">
            <button class="btn btn-success mr-2">Comprar</button>
            <button class="btn btn-secondary">&#128722;</button>
        </div>
    </div>
    `

    document.getElementById("product-info").innerHTML = info

    //Defino la descripcion del producto para despues agregarla con DOM
    let description = `
    <h5 style="font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;">Descripción:</h5>
    <p><em>`+ array.description + `</em></p>
    `

    document.getElementById("product-description").innerHTML = description

    indexRelatedProducts = array.relatedProducts
}

//Funcion para mostrar los comentarios del producto
function showComments(array) {

    //Defino los comentarios del producto para despues agregarlos con DOM
    let productComments = `
    <h5 class="mb-3" style="font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;">Comentarios:</h5>
    `

    //Con este for recorro todos los comentarios para ir agregandolos a productComments
    for (let i = 0; i < array.length; i++) {
        const comment = array[i];
        
        //Con estos for agrego las estrellas, si el score es menos de 5 va a agregar estrellas que no estan pintadas y eso lo guarda en la variable calificacion
        let calification = ""
        for (let i = 1; i <= comment.score; i++) {
            calification += `<span class="fa fa-star checked"></span>`
        }
        for (let i = comment.score + 1; i <= 5; i++) {
            calification += `<span class="fa fa-star"></span>`
        }

        productComments +=`
        <div class="border rounded my-3 p-3">
            <a class="mr-2" href="">`+ comment.user + `</a>
            <span>` + calification + `</span>
            <p class="mt-2">`+ comment.description + `</p>
            <small class="text-secondary">`+ comment.dateTime + `</small>
        </div>
        `
    }

    //Ademas tambien agrego al final los controles para comentar
    productComments += `
    <div class="my-5">
        <h5 class="mb-3" style="font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;">Agregar comentario:</h5>
        <textarea class="d-flex w-100 p-3" name="comment" id="user_comment"></textarea>
        <div id="calification">
            <input id="radio1" type="radio" name="estrellas" value="5" onclick="document.getElementById('value').innerHTML='5'">
            <label for="radio1">&#10025;</label>
            <input id="radio2" type="radio" name="estrellas" value="4" onclick="document.getElementById('value').innerHTML='4'">
            <label for="radio2">&#10025;</label>
            <input id="radio3" type="radio" name="estrellas" value="3" onclick="document.getElementById('value').innerHTML='3'">
            <label for="radio3">&#10025;</label>
            <input id="radio4" type="radio" name="estrellas" value="2" onclick="document.getElementById('value').innerHTML='2'">
            <label for="radio4">&#10025;</label>
            <input id="radio5" type="radio" name="estrellas" value="1" onclick="document.getElementById('value').innerHTML='1'" checked>
            <label for="radio5">&#10025;</label>
        </div><br>
        <button type="button" class="btn btn-primary" onclick="sendComment()">Enviar</button>
        <p id="value" class="d-none">1</p>
    </div>` 

    document.getElementById("product-comments").innerHTML = productComments
}

//Funcion que muestra los productos relacionados
function showRelatedProducts(array) {

    let relatedProducts = `
    <div class="container">
        <h5 class="mb-3" style="font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;">Productos relacionados:</h5>
    `

    //Con este for recorro el array con los indices de los productos relacionados
    //y los voy pasando como indices del array con todos los productos
    for (let i = 0; i < indexRelatedProducts.length; i++) {
        const index = indexRelatedProducts[i];

        relatedProducts += `
        <div class="justify-content-center">
            <a href="product-info.html" class="card mb-4 shadow-sm custom-card shadow">
                <img class="bd-placeholder-img card-img-top" src="`+ array[index].imgSrc +`">
                <h3 class="mx-3 mt-3 mb-0"><b>`+ array[index].name +`</b></h3>
                <small class="text-muted mx-3">Vendidos: ` + array[index].soldCount + `</small>
                <h5 class="mx-3 mt-2"><b class="text-success" style="font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;">$`+ array[index].cost +` `+ array[index].currency +`</b></h5>
                <div class="card-body pt-0">
                <p class="card-text">`+ array[index].description +`</p>
                </div>
            </a>
        </div>`
            
    }

    relatedProducts += `</div>`

    document.getElementById("related-products").innerHTML = relatedProducts
}


//Funcion que obtiene la fecha y hora exacta
function getDateAndTime () {

    //Defino la fecha de hoy y luego los datos de la fecha para luego
    //ponerlos en el formato de la fecha de los comentarios
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; 
    let yyyy = today.getFullYear();
    let hh = today.getHours()
    let min = today.getMinutes()
    let ss = today.getSeconds()

    if (dd < 10) {
    dd = '0' + dd;
    }

    if (mm < 10) {
    mm = '0' + mm;
    }

    if (hh < 10) {
        hh = '0' + mm;
    }

    if (min < 10) {
        min = '0' + mm;
    }

    if (ss < 10) {
        ss = '0' + mm;
    }
        
    //Para poner la fecha en formato para el comentario enviado
    today = yyyy + '-' + mm + '-' + dd + ' ' + hh + ':'+ min + ':'+ ss

    return today
}


//Esta funcion es para enviar comentarios
//Guarda el comentario enviado en el array de comentarios
//Luego vuelve a mostrar los comentarios pero esta vez con el agregado
function sendComment() {

    //Calificacion asignada
    let stars = document.getElementById("value").innerHTML

    //Defino el nuevo comentario realizado por el usuario
    let newComment = {
        score: parseInt(stars),
        description: user_comment.value,
        user: document.getElementById("user").innerHTML,
        dateTime: getDateAndTime()
    }

    comments.push(newComment)

    //Vuelvo a mostrar los comentarios pero esta vez con el agregado
    document.getElementById("product-comments").innerHTML = ""

    showComments(comments)  
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then(function (respuesta) {
        if (respuesta.status === "ok") {
            productInfo = respuesta.data;
            showInfo(productInfo);
        } else {
            alert(respuesta.data)
        }
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (respuesta) {
        if (respuesta.status === "ok") {
            comments = respuesta.data;
            showComments(comments);
        } else {
            alert(respuesta.data)
        }
    });

    getJSONData(PRODUCTS_URL).then(function (respuesta) {
        if (respuesta.status === "ok") {
          allProducts = respuesta.data;
          showRelatedProducts(allProducts);
        } else {
          alert(respuesta.data)
        }
    });
})
