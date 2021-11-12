let productos = []

let minCost
let maxCost
let buscar

//Funcion para mostrar los productos 
function cargarProductos(array) {

  let listado = ""

  for (let i = 0; i < array.length; i++) {
    const producto = array[i];

    if (((minCost === undefined) || (producto.cost >= minCost)) &&
      ((maxCost === undefined) || (producto.cost <= maxCost)) &&
      ((buscar === undefined) || (producto.name.toLowerCase().includes(buscar)))) {

      listado += `
        <div class="col-md-4 justify-content-center">
          <div class="card shadow border-secondary" onclick="redireccion()">
            <img src="`+ producto.imgSrc +`" class="card-img-top">
            <div class="card-body">
              <h4 class="card-title"><b>`+ producto.name +`</b></h4>
              <p class="card-text">`+ producto.description +`</p>
              <div class="d-flex justify-content-end align-items-center">
                <small class="text-muted">Vendidos: ` + producto.soldCount + `</small>
              </div>
            </div>
            <div class="card-footer border-secondary">
              Precio: <b class="text-success">$`+ producto.cost +` `+ producto.currency +`</b><span class="float-right text-secondary">&#10095;</span>
            </div>
          </div>
        </div>
      `
    }
    document.getElementById("products-list").innerHTML = listado
  }
}
//Funcion para ir a ver la informacion del producto
function redireccion () {
  window.location = "product-info.html"
}

//Funcion para ordenar los productos
function ordenarProductos(criterio, array) {
  let prodOrdenados = []

  if (criterio === 1) {
    prodOrdenados = array.sort(
      function (a, b) {
        if (a.cost > b.cost) {
          return 1
        }
        if (a.cost < b.cost) {
          return -1
        }
        return 0
      })

    document.getElementById("order").innerHTML = `Menor precio`
  }

  if (criterio === 2) {
    prodOrdenados = array.sort(
      function (a, b) {
        if (a.cost < b.cost) {
          return 1
        }
        if (a.cost > b.cost) {
          return -1
        }
        return 0
      })

    document.getElementById("order").innerHTML = `Mayor precio`
  }

  if (criterio === 3) {
    prodOrdenados = array.sort(
      function (a, b) {
        if (a.soldCount < b.soldCount) {
          return 1
        }
        if (a.soldCount > b.soldCount) {
          return -1
        }
        return 0
      })

    document.getElementById("order").innerHTML = `Relevancia`
  }

  cargarProductos(prodOrdenados)
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCTS_URL).then(function (respuesta) {
    if (respuesta.status === "ok") {
      productos = respuesta.data;
      cargarProductos(productos);
    } else {
      alert(respuesta.data)
    }
  });

  document.getElementById("filtrar").addEventListener("click", function () {

    minCost = document.getElementById("costMin").value
    maxCost = document.getElementById("costMax").value

    if ((minCost != undefined) && (minCost != "") && (parseInt(minCost) >= 0)) {
      minCost = parseInt(minCost)
    } else {
      minCost = undefined
    }

    if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost) >= 0)) {
      maxCost = parseInt(maxCost)
    } else {
      maxCost = undefined
    }

    cargarProductos(productos);
  })

  document.getElementById("clear").addEventListener("click", function () {

    document.getElementById("costMin").value = "";
    document.getElementById("costMax").value = "";

    minCost = undefined;
    maxCost = undefined;

    cargarProductos(productos);
  })

  document.getElementById("buscar").addEventListener("input", function() {

    buscar = document.getElementById("buscar").value.toLowerCase(),

    cargarProductos(productos)
  })
})