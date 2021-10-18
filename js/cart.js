let productsInCart = []
let cantidad = []
let unitsCost = []
let actualCurrency = "USD"

//Funcion que muestra los productos que agregó el usuario al carrito para comprar
function showProductsInCart(array) {

    let productsToBuy = ""

    for (let i = 0; i < array.articles.length; i++) {
        const product = array.articles[i];

        //Guardo el precio unitario y las cantidades en array para despues accender a ellos con su respectivo indice
        unitsCost.push(product.unitCost)
        cantidad.push(product.count)

        productsToBuy += `
            <div class="row shadow">
                <div class="col-12 border border-dark rounded">    
                    <div class="row p-3 p-md-5 addedProduct">
                        <div class="col-md-2 col-1 align-self-center">
                            <div class="border rounded d-inline-block">
                                <button class="btn d-block d-md-inline mx-auto mx-md-0" style="color: red;" onclick="decrease(`+ i + `)">-</button>
                                <p id="cantidad`+ i + `" class="d-flex d-md-inline mx-md-2 justify-content-center">` + cantidad[i] + `</p>
                                <button class="btn d-block d-md-inline mx-auto mx-md-0" style="color: green;" onclick="increase(`+ i + `)">+</button>
                            </div>
                        </div>
                        <div class="col-md-7 col-8 align-self-center">
                            <div class="row py-md-3">
                                <div class="col-md-3 col-4 align-self-center text-center">
                                    <img src="`+ product.src + `" style="width: 80%;">
                                </div>
                                <div class="col-md-9 col-8 p-1">
                                    <h2 class="d-none d-md-block" style="font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif; font-weight: bold;">`+ product.name + `</h2>
                                    <h4 class="d-block d-md-none" style="font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif; font-weight: bold;">`+ product.name + `</h4>
                                    <h6 class="text-secondary">$ `+ product.unitCost + ` ` + product.currency + `</h6>
                                </div>
                            </div>
                        </div>
                        <div class="col-3 container align-self-center d-none d-md-block">
                            <h2 class="text-center lead">Costo:</h2>
                            <h2 class="text-center">$ <span id="costPerQuantity`+ i + `">` + cantidad[i] * unitsCost[i] + `</span> ` + product.currency + `</h2>
                        </div>
                        <div class="col-3 container align-self-center d-block d-md-none">
                            <h6 class="text-center lead">Costo:</h6>
                            <h5 class="text-center font-weight-bold">$ <span id="costPerQuantity`+ i + `">` + cantidad[i] * unitsCost[i] + `</span> ` + product.currency + `</h5>
                        </div>
                    </div>
                </div>    
            </div><br> 
        `
    }

    document.getElementById("cart").innerHTML = productsToBuy
}


//Funcion que muestra los controles del carrito
function showCartControls() {

    cartControls = `
        <div class="row">
            <div class="col-12 px-4 pt-4">
                <h1 class="text-center lead">Total del carrito:</h1> 
                <div class="dropdown text-center">
                    <h1 class="d-inline" style="font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;">$ <span id="subtotalCost">`+ getCartTotal(productsInCart, 1) + `</span></h1>
                    <button class="btn p-0 dropdown-toggle d-inline" type="button" id="currency" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="color: white;">
                        USD
                    </button>
                    <div class="dropdown-menu" aria-labelledby="currency">
                        <button class="dropdown-item" onclick="changeCurrency(2)">UYU</button>
                        <button class="dropdown-item" onclick="changeCurrency(1)">USD</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12 px-5">
                <h3 class="text-center text-primary font-italic font-weight-light">Envio:</h3>
                <label>Dirección:</label>
                <input type="text" id="address" class="form-control form-control-sm">
                <p id="invalid1" class="d-none m-0 " style="color: red; font-size: 12px;">* Debe completar todos los campos</p>
                <label class="pt-2">País:</label>
                <input type="text" id="country" class="form-control form-control-sm">
                <p id="invalid2" class="d-none m-0" style="color: red; font-size: 12px;">* Debe completar todos los campos</p>
                <label class="pt-2">Tipo de envio:</label>
                <select id="selectType" name="envio" class="form-control form-control-sm" onchange="getSendingCost()">
                    <option id="selectnone" style="color: gray;">Seleccionar tipo de envio...</option>
                    <option id="premium" style="color: orange;">Premium (2-5 dias)</option>
                    <option id="express" style="color: lightskyblue;">Express (5-8 dias)</option>
                    <option id="standard" style="color: black;">Standard (12-15 dias)</option>
                </select>
                <p id="invalid3" class="d-none m-0" style="color: red; font-size: 12px;">* Debe completar todos los campos</p>
                <h2 class="lead pt-3">Costo del envio: <span class="text-primary font-weight-light" id="sendingCost" style="font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;"></span> </h2><hr>
            </div>
        </div>
        <div class="row">
            <div class="col-12 text-center pt-1">
                <button id="buy" class="btn btn-lg btn-success mb-3" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample" onclick="validation()">Comprar</button>
                <div class="collapse mb-3 text-left mx-auto" id="collapsecomprar">
                    <div class="card card-body" style="color: black;">
                        <form>
                            <h4 class="pb-2">Ingrese sus datos:</h4>
                            <label>Nombre:</label>
                            <input id="data0" type="text" class="form-control form-control-sm" placeholder="Ingrese su nombre..."><br>
                            <label>Nro. de Tarjeta:</label><br>
                            <input id="data1" type="text" class="form-control form-control-sm d-inline" style="width: 120px;" maxlength="6">
                            <p class="d-inline"> XX - XXXX - </p>
                            <input id="data2" type="text" class="form-control form-control-sm d-inline" style="width: 90px;" maxlength="4"><br><br>
                            <label>Exp:</label><br>
                            <input id="data3" type="text" class="form-control form-control-sm d-inline" placeholder="mm" style="width: 70px;" maxlength="2">
                            <p class="d-inline">/</p>
                            <input id="data4" type="text" class="form-control form-control-sm d-inline" placeholder="aaaa" style="width: 90px;" maxlength="4"><br><br>
                            <label>Email:</label>
                            <input id="data5" type="text" class="form-control form-control-sm" placeholder="Ingrese su email..."><br>
                            <h3 class="lead pb-2">TOTAL: <span id="totalToPay" class="text-success" style="font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;"></span></h3>
                            <button class="btn btn-primary" onclick="sendUserData()">Enviar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `

    document.getElementById("controls").innerHTML = cartControls
}


//Funcion que calcula el total del carrito (subtotal) y ademas lo devuelve en USD o en UYU
function getCartTotal(array, criterio) {

    let subtotalUSD = 0
    let subtotalUYU = 0

    for (let i = 0; i < array.articles.length; i++) {
        const product = array.articles[i];

        if (product.currency == "USD") {
            subtotalUSD += (cantidad[i])*(unitsCost[i])
            subtotalUYU += (cantidad[i])*(unitsCost[i]*40)
        }
        if (product.currency == "UYU") {
            subtotalUSD += (cantidad[i])*((unitsCost[i])/40)
            subtotalUYU += (cantidad[i])*(unitsCost[i])
        }
    }

    if(criterio == 1){
        return subtotalUSD
    }
    if (criterio == 2){
        return subtotalUYU
    }
}

//Funcion para aumentar la cantidad a comprar de cada producto
//y ademas actualiza el precio con la cantidad asignada 
function increase(index) {
    cantidad[index] += 1

    document.getElementById('cantidad' + index).innerHTML = cantidad[index]

    document.getElementById('costPerQuantity' + index).innerHTML = (cantidad[index]) * (unitsCost[index])

    if(actualCurrency == "USD"){
        document.getElementById("subtotalCost").innerHTML = getCartTotal(productsInCart, 1)
    }
    if(actualCurrency == "UYU"){
        document.getElementById("subtotalCost").innerHTML = getCartTotal(productsInCart, 2)
    }

    //Ejecuta esta funcion para actualizar tambien el precio de envio y el precio total
    getSendingCost()
}



//Funcion para disminuir la cantidad a comprar de cada producto
//y ademas actualiza el precio con la cantidad asignada
function decrease(index) {
    if (cantidad[index] > 1) {
        cantidad[index] -= 1
    }
    document.getElementById('cantidad' + index).innerHTML = cantidad[index]

    document.getElementById('costPerQuantity' + index).innerHTML = (cantidad[index]) * (unitsCost[index])

    if(actualCurrency == "USD"){
        document.getElementById("subtotalCost").innerHTML = getCartTotal(productsInCart, 1)
    }
    if(actualCurrency == "UYU"){
        document.getElementById("subtotalCost").innerHTML = getCartTotal(productsInCart, 2)
    }

    //Ejecuta esta funcion para actualizar tambien el precio de envio y el precio total
    getSendingCost()
}



//Funcion para cambiar la moneda de los precios
function changeCurrency(criterio) {

    if (criterio == 1) {
        document.getElementById("currency").innerHTML = `USD`
        document.getElementById("subtotalCost").innerHTML = getCartTotal(productsInCart, 1)
        actualCurrency = "USD"
    }
    if (criterio == 2) {
        document.getElementById("currency").innerHTML = `UYU`
        document.getElementById("subtotalCost").innerHTML = getCartTotal(productsInCart, 2)
        actualCurrency = "UYU"
    }

    //Ejecuta esta funcion para cambiar la moneda tambien del precio de envio y del precio total
    getSendingCost()
}



//Esta funcion calcula el costo de envio dependiendo del total del carrito, ademas muestra el costo total
//y se ejecuta cuando se selecciona un tipo de envio.
function getSendingCost() {

    let sendingCostUSD = 0
    let sendingCostUYU = 0


    if(document.getElementById("premium").selected) {

        if(actualCurrency == "USD"){
            sendingCostUSD = (getCartTotal(productsInCart, 1))*(0.15)
            document.getElementById("sendingCost").innerHTML = `$ `+ sendingCostUSD +` USD`
            //Esta funcion tambien calcula el precio total pero este va a ser mostrado cuando se accione el collapse
            document.getElementById("totalToPay").innerHTML = `$ `+ (getCartTotal(productsInCart, 1)+sendingCostUSD) +` USD`
        }

        if(actualCurrency == "UYU"){
            sendingCostUYU = (getCartTotal(productsInCart, 2))*(0.15)
            document.getElementById("sendingCost").innerHTML = `$ `+ sendingCostUYU +` UYU`
            document.getElementById("totalToPay").innerHTML = `$ `+ (getCartTotal(productsInCart, 2)+sendingCostUYU) +` UYU`
        }
    }

    if(document.getElementById("express").selected) {

        if(actualCurrency == "USD"){
            sendingCostUSD = (getCartTotal(productsInCart, 1))*(0.07)
            document.getElementById("sendingCost").innerHTML = `$ `+ sendingCostUSD +` USD`
            document.getElementById("totalToPay").innerHTML = `$ `+ (getCartTotal(productsInCart, 1)+sendingCostUSD) +` USD`
        }

        if(actualCurrency == "UYU"){
            sendingCostUYU = (getCartTotal(productsInCart, 2))*(0.07)
            document.getElementById("sendingCost").innerHTML = `$ `+ sendingCostUYU +` UYU`
            document.getElementById("totalToPay").innerHTML = `$ `+ (getCartTotal(productsInCart, 2)+sendingCostUYU) +` UYU`
        }
    }

    if(document.getElementById("standard").selected) {

        if(actualCurrency == "USD"){
            sendingCostUSD = (getCartTotal(productsInCart, 1))*(0.05)
            document.getElementById("sendingCost").innerHTML = `$ `+ sendingCostUSD +` USD`
            document.getElementById("totalToPay").innerHTML = `$ `+ (getCartTotal(productsInCart, 1)+sendingCostUSD) +` USD`
        }

        if(actualCurrency == "UYU"){
            sendingCostUYU = (getCartTotal(productsInCart, 2))*(0.05)
            document.getElementById("sendingCost").innerHTML = `$ `+ sendingCostUYU +` UYU`
            document.getElementById("totalToPay").innerHTML = `$ `+ (getCartTotal(productsInCart, 2)+sendingCostUYU) +` UYU`
        }
    }
}


//Funcion para validar todos los campos del envio para pasar al proceso de compra
function validation() {

    let allcompleted = true

    if(document.getElementById('address').value === ""){

        document.getElementById('invalid1').classList.remove('d-none')
        allcompleted= false

    } else {
        document.getElementById('invalid1').classList.add('d-none')
    }

    if(document.getElementById('country').value === ""){

        document.getElementById('invalid2').classList.remove('d-none')
        allcompleted= false

    } else {
        document.getElementById('invalid2').classList.add('d-none')
    }

    if(document.getElementById('selectnone').selected){

        document.getElementById('invalid3').classList.remove('d-none')
        allcompleted= false

    } else {
        document.getElementById('invalid3').classList.add('d-none')
    }

    //Si todos los campos estan completos le cambia el id al boton collapse
    //para que este funcione, asi asegura que se completen los campos del envio
    //para luego pasar al proceso de compra
    if(allcompleted) {
        document.getElementById('collapsecomprar').id = 'collapseExample'
    }
}

//Funcion para validar los datos del proceso de compra y
//si todos los campos estan completos se realiza la compra con exito
function sendUserData() {
    for (let i = 0; i < 6; i++) {

        if(document.getElementById("data"+ i).value === "") {
            document.getElementById("data"+ i).classList.add('is-invalid')
        } else {
            document.getElementById("data"+ i).classList.remove('is-invalid')
        }


        if(document.getElementById("data"+ i).value != "") {

            document.getElementById("collapseExample").innerHTML = `
            <div class="alert alert-success" role="alert">
                Compra realizada con exito!
            </div>`
        }
    }
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_URL2).then(function (respuesta) {
        if (respuesta.status === "ok") {
            productsInCart = respuesta.data;
            showProductsInCart(productsInCart);
            showCartControls()
        } else {
            alert(respuesta.data)
        }
    });
});