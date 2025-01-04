

function crearCuenta() {
    location.href = `${dominio}/login`
}

function regresar(){
    location.href = `${dominio}/`
}

function inicioSesion() {
    document.getElementById("login").style.display = "none";
    document.getElementById("singin").style.backgroundColor = "rgb(250,250,250)"; 
    document.getElementById("singin").style.display = "flex";
}
    


  
    
    const usersd = document.getElementById("users")

    usersd.addEventListener(type ="submit", function logear(event){
        event.preventDefault();
        let users = new FormData(usersd);

        contentData = {
            "Nombre_de_usuario":users.get("Nombre_de_usuario"),
            "Nombre"     :      users.get("Nombre"),
            "Apellido"   :    users.get("Apellido"),
            "Email"      :       users.get("Email"),
            "Contraseña" :  users.get("Contraseña"),
            "Repite Contraseña":users.get("Repita")
        }
        const update = {
            title: 'usuario creado',
            body: `${contentData}`,
            userId: 1,
            };
            
            const options = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(update),
            };
            fetch(`${dominio}/login/userCreate`, options)
            .then(data => {
                if (!data.ok) {
                  throw Error(data.status);
                 }
                 return data.json();
                }).then(update => {
                console.log(update)})
    })

    const us = document.getElementById("log")

    us.addEventListener(type ="submit", function logear(event){
        event.preventDefault();
        let use = new FormData(us);

        contentData = {
            "Nombre_de_usuario":use.get("Nombre_de_usuario"),
            "Contraseña" :  use.get("Contraseña")
        }
        const update = {
            title: 'usuario logeado',
            body: `${contentData}`,
            userId: 1,
            };
            
            const options = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(update),
            };
            fetch(`${dominio}/login/user`, options)
            .then(data => {
                if (!data.ok) {
                  throw Error(data.status);
                 }
                 return data.json();
                }).then(update => {
                console.log(update)})
    })