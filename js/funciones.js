// Cuando la página esté cargada, llama a las funciones necesarias
// para redirigir y mostrar la frase motivadora

document.addEventListener('DOMContentLoaded', function() {
    redirigir_login();
    redirigir_registro();
    mostrarFraseMotivadora();
});

// Función para redirigir a la página de login
function redirigir_login() {
    const login_btn = document.getElementById('login-btn');
    if (login_btn) {
        login_btn.addEventListener('click', function() {
            window.location.href = 'login.html';
        });
    }
}

// Función para redirigir a la página de registro
function redirigir_registro() {
    const registro_btn = document.getElementById('registro-btn');
    if (registro_btn) {
        registro_btn.addEventListener('click', function() {
            window.location.href = 'registro.html';
        });
    }
}

// Arreglo con frases motivadoras (lo ponemos fuera de la función para reutilizarlo)
const frases = [
    "¡Hoy es un buen día para empezar!",
    "Cada pequeño paso cuenta.",
    "Tú puedes lograrlo, sigue adelante.",
    "La sostenibilidad comienza contigo.",
    "Haz la diferencia, incluso con acciones pequeñas."
];

let fraseActual = -1; // Guardar el índice de la frase actual

// Función para mostrar una frase motivadora aleatoria
function mostrarFraseMotivadora() {
    let indice;
    do {
        indice = Math.floor(Math.random() * frases.length);
    } while (frases.length > 1 && indice === fraseActual); // Evita repetir la misma frase
    fraseActual = indice;
    const divFrase = document.getElementById('fraseMotivadora');
    if (divFrase !== null) {
        divFrase.textContent = frases[indice];
    }
}

// Agregar evento al botón para cambiar la frase
// Esto se hace cuando el DOM esté listo

document.addEventListener('DOMContentLoaded', function() {
    redirigir_login();
    redirigir_registro();
    mostrarFraseMotivadora();
    const btnNuevaFrase = document.getElementById('btn-nueva-frase');
    if (btnNuevaFrase) {
        btnNuevaFrase.addEventListener('click', mostrarFraseMotivadora);
    }
});
