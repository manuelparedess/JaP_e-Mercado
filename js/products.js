let productos=[]

function cargarProductos(array) {

    let listado = ""

    for (let i = 0; i < array.length; i++) {
        const producto = array[i];

        listado += `
        <div class="product">
          <div class="products-image">
            <img id="product-image" src="`+ producto.imgSrc +`">
          </div>
          <div class="products-name"> 
            <h3 id="product-name">`+ producto.name +`</h3>
          </div>
          <div class="products-description">
            <p id="product-description" style="font-style: oblique;">`+ producto.description +`</p>
          </div>
          <div class="products-cost">
            <h4 id="product-cost"> $`+ producto.cost +` `+ producto.currency +`</h4>
          </div>
          <div class="products-soldcount">
            <p id="soldcount">Vendidos: ` + producto.soldCount +`</p>
          </div>
        </div>
        <br><br>
        `
        
        document.getElementById("products-list").innerHTML = listado
    }
}



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function(respuesta){
        if (respuesta.status === "ok"){
            productos = respuesta.data;
            cargarProductos(productos);
        } else {
            alert(respuesta.data)
        }
    });
})