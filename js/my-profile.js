let user = JSON.parse(localStorage.getItem("usuario"))


//Funcion para mostrar los datos del perfil si este se encuentra guardado
//sino se mostrará unicamente el dato con el que ingresó (usuario o email)
function showProfileData() {

  let profileList = []

  if (user.includes("@")) {
    document.getElementById("email").innerHTML = user //el dato con el que se logueo se muestra aunque no este guardado el perfil

    //me fijo si hay perfiles guardados
    if (localStorage.getItem("profiles")) {
      profileList = JSON.parse(localStorage.getItem("profiles"))
    }

    for (let i = 0; i < profileList.length; i++) {
      const profile = profileList[i];

      //si algun perfil tiene el mismo dato con el que se logueo el cliente entonces
      //se muestran los datos que tiene guardados (si los modificó)
      if (profile.email === user) {
        document.getElementById('savedImg').src = profile.image
        document.getElementById("usu").innerHTML = profile.usuario
        document.getElementById("name").innerHTML = profile.name
        document.getElementById("age").innerHTML = profile.age
        document.getElementById("number").innerHTML = profile.phone
      }
    }

  } else {
    document.getElementById("usu").innerHTML = user //el dato con el que se logueo se muestra aunque no este guardado el perfil

    if (localStorage.getItem("profiles")) {
      profileList = JSON.parse(localStorage.getItem("profiles"))
    }

    for (let i = 0; i < profileList.length; i++) {
      const profile = profileList[i];

      if (profile.usuario === user) {
        document.getElementById('savedImg').src = profile.image
        document.getElementById("email").innerHTML = profile.email
        document.getElementById("name").innerHTML = profile.name
        document.getElementById("age").innerHTML = profile.age
        document.getElementById("number").innerHTML = profile.phone
      }
    }
  }
}

//Funcion para modificar los datos del perfil
function changeProfileData() {

  let formImg = document.getElementById('savedImg').src
  let formUsu = document.getElementById("usu").innerHTML
  let formEmail = document.getElementById("email").innerHTML
  let formName = document.getElementById("name").innerHTML
  let formAge = document.getElementById("age").innerHTML
  let formNumber = document.getElementById("number").innerHTML

  let form = `

    <div class="row mb-3">
      <div class="col-12 text-center">
        <img src="${formImg}" id="profile-img" style="width: 10rem;">
      </div>
    </div>
    <div class="row mb-3 justify-content-around">
      <div class="col-4 text-center">
        <input id="selectImg" class="custom-file-input" type="file" onchange="selectImageProfile()">
        <label class="custom-file-label" for="selectImg">Seleccionar...</label>
      </div>
    </div>
    <form>
        <div class="row">
          <h2 class="subtitle">Datos de cuenta</h2>
        </div>
        <div class="row bg-light mt-3 d-block p-4 border border-secondary rounded shadow">
          <label class="d-inline mr-2" for="form-usu">Usuario:</label>
          <input type="text" class="form-control d-inline" id="form-usu" value="${formUsu}" style="width: 15em;">
          <p id="invalid-usu" class="text-danger d-none">* Debe ingresar un usuario</p>
          <br><br>
          <label class="d-inline mr-2" for="form-email">Email:</label>
          <input type="email" class="form-control d-inline" id="form-email" value="${formEmail}" placeholder="Ingresar email..." style="width: 20em;">
          <p id="invalid-email" class="text-danger d-none">* Debe utilizar @ para indicar un email</p>
        </div>
        <div class="row mt-5">
          <h2 class="subtitle">Datos personales</h2>
        </div>
        <div class="row bg-light mt-3 d-block p-4 border border-secondary rounded shadow">
          <label class="d-inline mr-2" for="form-name">Nombre y apellido:</label>
          <input type="text" class="form-control d-inline" id="form-name" value="${formName}" placeholder="Escribe tu nombre y apellido..." style="width: 20em;">
          <br><br>
          <label class="d-inline mr-2" for="form-age">Edad:</label>
          <input type="number" class="form-control d-inline" id="form-age" value="${formAge}" style="width: 5em;">
          <br><br>
          <label class="d-inline mr-2" for="form-number">Telefono de contacto:</label>
          <input type="number" class="form-control d-inline" id="form-number" value="${formNumber}" style="width: 15em;">
        </div>
    </form>
    <div class="mt-5 float-right">
        <button class="btn btn-success" onclick="saveProfileData()">Guardar datos</button>
    </div>
  `

  document.getElementById('alldata').innerHTML = form
}

//Funcion para guardar la imagen seleccionada para el perfil
function selectImageProfile() {

  let input = document.getElementById("selectImg")

  if (input.files && input.files[0]) {

    let reader = new FileReader();

    reader.onload = function (e) {
      document.getElementById('profile-img').src =  e.target.result;
    }

    reader.readAsDataURL(input.files[0]);

  }
}


//Funcion para guardar el perfil con sus datos correspondientes 
//luego de ser modificados o ingresados por primera vez.
//Los perfiles se guardan en localstorage.
function saveProfileData() {

  if ((document.getElementById('form-email').value.includes("@")) &&
    (document.getElementById('form-usu').value != "")) {

    let profileList = []

    let profile = {
      image: document.getElementById('profile-img').src,
      usuario: document.getElementById("form-usu").value,
      email: document.getElementById("form-email").value,
      name: document.getElementById("form-name").value,
      age: document.getElementById("form-age").value,
      phone: document.getElementById("form-number").value
    }

    if (localStorage.getItem("profiles")) {
      profileList = JSON.parse(localStorage.getItem("profiles"))
    }

    for (let i = 0; i < profileList.length; i++) {

      if ((profile.usuario === profileList[i].usuario) || (profile.email === profileList[i].email)) {

        profileList.splice(i, 1)
      }

    }

    //guardo el usuario para mostrarlo en la barra de navegacion
    //(la funcion con la que muestra el usuario y la foto de perfil en la barra de navegacion esta en init.js)
    localStorage.setItem("usuario", JSON.stringify(profile.usuario))

    //guardo el perfil en la lista de perfiles
    profileList.push(profile)

    //guardo la lista de perfiles (o la actualizo si ya habian perfiles guardados)
    localStorage.setItem("profiles", JSON.stringify(profileList))

    window.location = "my-profile.html"
  } else {
    if(document.getElementById('form-email').value.includes("@") === false) {
      document.getElementById('form-email').classList.add('is-invalid')
      document.getElementById('invalid-email').classList.remove('d-none')
      document.getElementById('invalid-email').classList.add('d-inline')
    }
    if(document.getElementById('form-usu').value === "") {
      document.getElementById('form-usu').classList.add('is-invalid')
      document.getElementById('invalid-usu').classList.remove('d-none')
      document.getElementById('invalid-usu').classList.add('d-inline')
    }
  }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  showProfileData()
});