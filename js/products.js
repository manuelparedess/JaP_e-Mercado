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
          <a href="product-info.html" class="card mb-4 shadow-sm custom-card shadow">
            <img class="bd-placeholder-img card-img-top" src="`+ producto.imgSrc +`">
            <h3 class="mx-3 mt-3 mb-0"><b>`+ producto.name +`</b></h3>
            <small class="text-muted mx-3">Vendidos: ` + producto.soldCount + `</small>
            <h5 class="mx-3 mt-2"><b class="text-success" style="font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;">$`+ producto.cost +` `+ producto.currency +`</b></h5>
            <div class="card-body pt-0">
              <p class="card-text">`+ producto.description +`</p>
            </div>
          </a>
        </div>
      `
    }
    document.getElementById("products-list").innerHTML = listado
  }
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