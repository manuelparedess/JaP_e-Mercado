let productsInfo
let comments
let info = ""

//Esta funcion muestra la informacion del producto
function showInfo(array) {

    info += `
        <div class="imain-info">
            <img id="m-i" class="rounded" src="`+ array.images[0] + `">
            <h2 id="iname">`+ array.name + `<hr></h2>
            <p id="icategory">Categoria: <a id="cat" href="category-info.html">`+ array.category + `</a> | Vendidos: ` + array.soldCount + `</p>
            <p id="iprice">Precio: $`+ array.cost + ` ` + array.currency + `</p>
            <button id="buy-now" class="btn btn-success">Comprar ahora</button><button id="add-to-cart" class="btn btn-outline-primary">&#128722;Agregar al carrito</button><br><hr>
            <p id="idescription">`+ array.description + `</p><hr>
            <p id="imgs">Imagenes:</p>
        </div>`
    //Carrousel de imagenes
    info +=`
        <div class="container iimages">
            <div class="row">
                <div class="col-sm-12">        
                    <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <img src="`+ array.images[0] + `" class="d-block w-100 rounded">
                            </div>
        `

    for (let i = 1; i < array.images.length; i++) {

        info += `
            <div class="carousel-item">
                <img src="`+ array.images[i] + `" class="d-block w-100 rounded">
            </div>
        `
    }

    info += `
                            <a class="left carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="sr-only">Previous</span>
                            </a>
                            <a class="right carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="sr-only">Next</span>
                            </a> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    <p id="comms">Comentarios:</p>`
    document.getElementById("info-product").innerHTML = info
}

//Esta funcion muestra los comentarios
function showComments(array) {

    for (let i = 0; i < array.length; i++) {
        const comment = array[i];
        //Con estos for agrego las estrellas, si la calificacion es menos de 5 va a agregar estrellas que no estan pintadas y eso lo guarda en la variable calificacion
        let calification = ""
        for (let i = 1; i <= comment.score; i++) {
            calification += `<span class="fa fa-star checked"></span>`
        }
        for (let i = comment.score + 1; i <= 5; i++) {
            calification += `<span class="fa fa-star"></span>`
        }

        info += `
        <div class="comments">
            <img src="img/usuario.png" class="img-user"><a id="cuser" href="">`+ comment.user + `<span id="cscore">` + calification + `</span></a><br>
            <p id="cdescription">`+ comment.description + `</p>
            <p id="cdate">`+ comment.dateTime + `</p>
        </div>
        
        `
    }

    //Controles para comentar y calificar
    info += `
        <div class="user-comments">
            <p id="add-comm">Agregar comentario:</p>
            <textarea name="comment" id="user_comment" cols="30" rows="10"></textarea>
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
            <button id="comment-submit" type="button" class="btn btn-primary" onclick="sendComment()">Enviar</button>
            <p id="value">1</p>
        </div>
        ` 
    
    document.getElementById("info-product").innerHTML = info
}

//Esta funcion es para enviar comentarios
//Guarda el comentario enviado en localstorage y lo agrega al array comments
//Luego vuelve a mostrar los comentarios pero esta vez con el agregado
function sendComment() {
    let stars = document.getElementById("value").innerHTML

    let fechaYHora = new Date()

    let usuario_json = localStorage.getItem("usuario")
    
    let usuario = JSON.parse(usuario_json)    


    let message = {
        score: parseInt(stars),
        description: user_comment.value,
        user: usuario,
        dateTime: fechaYHora
    }

    let message_json = JSON.stringify(message)

    localStorage.setItem("message", message_json)

    if (localStorage.getItem("message")) {

        let message_json = localStorage.getItem("message")

        let message = JSON.parse(message_json)
        
        if(message.description != ""){
        comments.push(message)
        }
    }
    info = ""

    showInfo(productsInfo)
    showComments(comments)
      
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then(function (respuesta) {
        if (respuesta.status === "ok") {
            productsInfo = respuesta.data;
            showInfo(productsInfo);
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
})
