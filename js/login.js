function guardarUsuario() {
    
    let usuario = document.getElementById("login-email").value
  
    let usuario_json = JSON.stringify(usuario)
  
    localStorage.setItem("usuario", usuario_json)
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    document.getElementById("login-submit").addEventListener("click", function (e) {

        let email = document.getElementById("login-email")
        let password = document.getElementById("login-password")
        let alerta = document.getElementById("alerta")
        let camposCompletados = true

        if (email.value === "") {
            camposCompletados = false
            email.classList.add("is-invalid")
        } else {email.classList.remove("is-invalid")}

        if (password.value === "") {
            camposCompletados = false
            password.classList.add("is-invalid")
        } else {password.classList.remove("is-invalid")}

        if (camposCompletados) {
            guardarUsuario()
            window.location = "index.html"
        } else {
            alerta.innerHTML = `* Debe completar todos los campos para iniciar sesion`
        }

    })
});
