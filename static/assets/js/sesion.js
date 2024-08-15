var registrarInactividad = function () {
    var t;
    window.onload = reiniciarTiempo;
    // Eventos del DOM
    document.onmousemove = reiniciarTiempo;
    document.onkeypress = reiniciarTiempo;
    document.onload = reiniciarTiempo;
    document.onmousemove = reiniciarTiempo;
    document.onmousedown = reiniciarTiempo; // aplica para una pantalla touch
    document.ontouchstart = reiniciarTiempo;
    document.onclick = reiniciarTiempo;     // aplica para un clic del touchpad
    document.onscroll = reiniciarTiempo;    // navegando con flechas del teclado
    document.onkeypress = reiniciarTiempo;

    function tiempoExcedido() {
        alert("Estuvo inactivo durante mucho tiempo.")
    }

    function reiniciarTiempo() {
        clearTimeout(t);
        t = setTimeout(tiempoExcedido, 3000)
        // 1000 milisegundos = 1 segundo
    }
};