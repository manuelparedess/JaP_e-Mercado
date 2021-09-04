let productos = []

let minCost
let maxCost
let buscar

function cargarProductos(array) {

  let listado = ""

  for (let i = 0; i < array.length; i++) {
    const producto = array[i];

    if (((minCost === undefined) || (producto.cost >= minCost)) &&
      ((maxCost === undefined) || (producto.cost <= maxCost)) &&
      ((buscar === undefined) || (producto.name.toLowerCase().includes(buscar)))) {

      listado += `
        <div class="product">
          <div class="products-image">
            <img id="product-image" src="`+ producto.imgSrc + `">
          </div>
          <div class="products-name"> 
            <h3 id="product-name">`+ producto.name + `</h3>
          </div>
          <div class="products-description">
            <p id="product-description" style="font-style: oblique;">`+ producto.description + `</p>
          </div>
          <div class="products-cost">
            <h4 id="product-cost"> $`+ producto.cost + ` ` + producto.currency + `</h4>
          </div>
          <div class="products-soldcount">
            <p id="soldcount">Vendidos: ` + producto.soldCount + `</p>
          </div>
        </div>
        <br><br>
        `
    }
    document.getElementById("products-list").innerHTML = listado
  }
}

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
  }

  return prodOrdenados
}

function showSelection() {
  document.getElementById("cost-desc").addEventListener("click", function() {
      document.getElementById("order").innerHTML = `<span class="arrow">&#11167</span>Menor precio`
  })

  document.getElementById("cost-asc").addEventListener("click", function() {
      document.getElementById("order").innerHTML = `<span class="arrow">&#11167</span>Mayor precio`
  })

  document.getElementById("relevance").addEventListener("click", function() {
      document.getElementById("order").innerHTML = `<span class="arrow">&#11167</span>Relevancia`
  })
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

  document.getElementById("cost-desc").addEventListener("click", function () {

    showSelection(),

    productos = ordenarProductos(1, productos)

    cargarProductos(productos)
  })

  document.getElementById("cost-asc").addEventListener("click", function () {

    showSelection(),

    productos = ordenarProductos(2, productos)

    cargarProductos(productos)
  })

  document.getElementById("relevance").addEventListener("click", function () {

    showSelection(),

    productos = ordenarProductos(3, productos)

    cargarProductos(productos)
  })

  document.getElementById("buscar").addEventListener("input", function() {

    buscar = document.getElementById("buscar").value.toLowerCase(),

    cargarProductos(productos)
  })
})