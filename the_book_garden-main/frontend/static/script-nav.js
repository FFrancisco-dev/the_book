
function regresar(){
    location.href = `${dominio}/`
}

function openMenu() {
    document.getElementById("sub").style.display="inline";
}

const fondo = document.getElementById("color");


    function osc() {
       var os = document.getElementById("os").className
    if(os != "body_os" ){
        document.getElementById("os").className = "nav_os";
        document.getElementById("body_os").className = "body_os";
        document.getElementById("aside_os").className = "aside_os";
        document.getElementById("logo_os").className = "logo_os";
        const art = document.querySelectorAll("article");

        art.forEach(arti => {
            arti.style.backgroundColor = "#004400";
        });
    
        document.getElementById("footer_os").className = "footer_os";

        }
        if(os == "body_os"){

        document.getElementById("os").remove( "nav_os");
        document.getElementById("body_os").remove( "body_os");
        document.getElementById("aside_os").remove("aside_os");
        document.getElementById("logo_os").remove("logo_os");
        document.getElementById("footer_os").remove("footer_os");
        const art = document.querySelectorAll("article");

        art.forEach(arti => {
        arti.style.backgroundColor = "rgb(28, 28, 28)";
        });
    }
    }



  
