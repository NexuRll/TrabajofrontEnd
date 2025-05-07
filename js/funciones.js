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
    "Haz la diferencia, incluso con acciones pequeñas.",
    "Todas mienten, solo la naturaleza nos dice la verdad",
    "Per aspera ad astra, A través de las espinas hacia las estrellas"
];

let fraseActual = -1; // Guardar el índice de la frase actual

// Función para mostrar una frase motivadora aleatoria
function mostrarFraseMotivadora() {
    let indice;
    do {
        indice = Math.floor(Math.random() * frases.length); // ecuacion matematica para buscar una frase random con el length
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
    if (btnNuevaFrase != null) {
        btnNuevaFrase.addEventListener('click', mostrarFraseMotivadora);
    } 
});

// Función para mostrar alerta de registro
function mostrarAlertaRegistro() {
    alert("Registrado con éxito, pero de momento no estamos funcionando con registros, use las credenciales por defecto en el login por favor");
    // Redirigir a la página de login después de mostrar la alerta
    setTimeout(() => {
        window.location.href = '../public/index.html';
    }, 500);
    return false; // Evita que el formulario se envíe normalmente
}

// Inicializar usuario por defecto y función de login
document.addEventListener('DOMContentLoaded', function() {
    // Usuario por defecto (se guarda si no existe ya)
    if (!localStorage.getItem('fakeUserEmail')) {
        localStorage.setItem('fakeUserEmail', 'admin@gmail.com');
        localStorage.setItem('fakeUserPass', 'admin');
    }
});

function login() {
    const email = document.getElementById('email').value;
    const pass = document.getElementById('password').value;

    const storedEmail = localStorage.getItem('fakeUserEmail');
    const storedPass = localStorage.getItem('fakeUserPass');

    if (email === storedEmail && pass === storedPass) {
        document.getElementById('msg').style.color = 'green';
        document.getElementById('msg').textContent = 'Login exitoso!';
        setTimeout(() => {
            window.location.href = '../public/home.html';
        }, 1500);
    } else {
        document.getElementById('msg').textContent = 'Correo o contraseña incorrectos';
    }
    return false; // Evita que el formulario se envíe normalmente
}

// Arreglo de productos
const productos = [
    {
        nombre: "Pan de masa madre",
        descripcion: "Pan de masa madre listo para tus comidas",
        precio: 2500
    },
    {
        nombre: "Pepinillos",
        descripcion: "Frasco de pepinillos frescos agridulces de la mejor calidad",
        precio: 6000
    },
    {
        nombre: "Saco de papa",
        descripcion: "Saco de 5kg de papas frescas",
        precio: 3000
    }
];

// Función para cargar productos en el DOM
function cargarProductos() {
    const productosContainer = document.getElementById('productos-container');
    if (!productosContainer) return;
    
    // Limpiar el contenedor
    productosContainer.innerHTML = '';
    
    // Usar forEach para recorrer y mostrar cada producto
    productos.forEach(producto => {
        const productoCard = document.createElement('div');
        productoCard.className = 'producto-card';
        
        productoCard.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <p class="precio">$${producto.precio.toLocaleString()}</p>
            <button class="btn-detalle">Ver detalle</button>
        `;
        
        productosContainer.appendChild(productoCard);
    });
}


// Inicializar la página home cuando se carga
document.addEventListener('DOMContentLoaded', function() {
    // Verificar si estamos en la página home
    if (document.querySelector('.home-page')) {
        cargarProductos();
        
        // Agregar evento a los botones de detalle
        setTimeout(() => {
            const botonesDetalle = document.querySelectorAll('.btn-detalle');
            botonesDetalle.forEach(boton => {
                boton.addEventListener('click', function() {
                    alert('Funcionalidad en desarrollo. Pronto podrás ver más detalles de este producto.');
                });
            });
        }, 100);
    }
    
    // Verificar si estamos en la página de comentarios
    if (document.querySelector('.comentarios-page')) {
        // Inicializar la página de comentarios
        inicializarPaginaComentarios();
    }
});

// Arreglo de comentarios
let comentarios = [];

/**
 * Inicializa la página de comentarios, configura eventos y carga comentarios existentes
 */
function inicializarPaginaComentarios() {
    // Obtener comentarios del localStorage si existen
    const comentariosGuardados = localStorage.getItem('comentarios');
    if (comentariosGuardados) {
        comentarios = JSON.parse(comentariosGuardados);
    }
    
    // Cargar comentarios existentes
    cargarComentarios();
    
    // Configurar evento para el formulario de comentarios
    const formComentario = document.getElementById('formComentario');
    if (formComentario) {
        formComentario.addEventListener('submit', function(e) {
            e.preventDefault(); // Evitar que el formulario se envíe
            agregarComentario();
        });
    }
}

/**
 * Carga los comentarios forEach
 */
function cargarComentarios() {
    const comentariosContainer = document.getElementById('comentarios-container');
    if (!comentariosContainer) return;
    
    // Limpiar el contenedor
    comentariosContainer.innerHTML = '';
    
    // Si no hay comentarios, mostrar mensaje
    if (comentarios.length === 0) {
        comentariosContainer.innerHTML = '<p>No hay comentarios aún. ¡Sé el primero en comentar!</p>';
        return;
    }
    
    // Usar forEach para recorrer y mostrar cada comentario
    comentarios.forEach(comentario => {
        const comentarioElement = document.createElement('div');
        comentarioElement.className = 'comentario-item';
        
        comentarioElement.innerHTML = `
            <h4>${comentario.nombreUsuario}</h4>
            <p>${comentario.textoComentario}</p>
        `;
        
        comentariosContainer.appendChild(comentarioElement);
    });
}

/**
 * Agrega un nuevo comentario al arreglo y actualiza el DOM
 */
function agregarComentario() {
    const nombreUsuarioInput = document.getElementById('nombreUsuario');
    const comentarioTextoInput = document.getElementById('comentarioTexto');
    
    if (!nombreUsuarioInput || !comentarioTextoInput) return;
    
    const nombreUsuario = nombreUsuarioInput.value.trim();
    const textoComentario = comentarioTextoInput.value.trim();
    
    // Validar que ambos campos tengan contenido
    if (!nombreUsuario) {
        alert('Por favor, ingresa tu nombre de usuario');
        return;
    }
    
    if (!textoComentario) {
        alert('Por favor, escribe un comentario');
        return;
    }
    
    // Crear nuevo objeto comentario
    const nuevoComentario = {
        nombreUsuario: nombreUsuario,
        textoComentario: textoComentario
    };
    
    // Agregar al arreglo de comentarios
    comentarios.push(nuevoComentario);
    
    // Guardar en localStorage para persistencia hasta que se cierre la página
    localStorage.setItem('comentarios', JSON.stringify(comentarios));
    
    // Actualizar la visualización
    cargarComentarios();
    
    // Limpiar los campos del formulario
    nombreUsuarioInput.value = '';
    comentarioTextoInput.value = '';
}

// Inicializar la página de contacto cuando se carga
document.addEventListener('DOMContentLoaded', function() {
    // Verificar si estamos en la página de contacto
    if (document.querySelector('.contacto-page')) {
        // Configurar evento para el formulario de contacto
        const formContacto = document.querySelector('.contacto-page form');
        if (formContacto) {
            formContacto.addEventListener('submit', validarContacto);
        }
    }
});

/**
 * Valida el formulario de contacto antes de enviarlo
 * @param {Event} event - El evento de submit del formulario
 * @returns {boolean} - True si el formulario es válido, false en caso contrario
 */
function validarContacto(event) {
    event.preventDefault();
    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();
    
    // Validar que todos los campos estén completos
    if (!nombre || !email || !mensaje) {
        alert("Por favor, completa todos los campos.");
        return false;
    }
    
    // Validar formato de email
    if (!email.includes("@")) {
        alert("Por favor, ingresa un correo electrónico válido.");
        return false;
    }
    
    // Mostrar mensaje de éxito
    alert("Formulario enviado correctamente.");
    
    // Limpiar el formulario
    document.getElementById("nombre").value = '';
    document.getElementById("email").value = '';
    document.getElementById("mensaje").value = '';
    
    return true;
}

// Arreglo de preguntas frecuentes
const faqs = [
    { 
        pregunta: "¿Cómo me registro?", 
        respuesta: "Puedes registrarte desde la página de registro en el menú principal." 
    },
    { 
        pregunta: "¿Dónde puedo ver mis datos?", 
        respuesta: "Puedes ver tus datos iniciando sesión y accediendo a tu perfil." 
    },
    { 
        pregunta: "¿Cómo contacto al soporte?", 
        respuesta: "Utiliza el formulario de contacto disponible en la página de contacto." 
    },
    { 
        pregunta: "¿Cuáles son los métodos de pago aceptados?", 
        respuesta: "Aceptamos tarjetas de crédito, débito, transferencias bancarias y efectivo contra entrega." 
    },
    { 
        pregunta: "¿Cuál es el tiempo de entrega?", 
        respuesta: "El tiempo de entrega estándar es de 24 a 48 horas hábiles, dependiendo de tu ubicación." 
    }
];

// Inicializar la página de FAQ cuando se carga
document.addEventListener('DOMContentLoaded', function() {
    // Verificar si estamos en la página de FAQ
    if (document.querySelector('.faq-page')) {
        cargarFaqs();
    }
});

/**
 * Carga las preguntas frecuentes en el DOM desde el arreglo de FAQs
 */
function cargarFaqs() {
    const container = document.getElementById("faq-container");
    if (!container) return;
    
    // Limpiar el contenedor
    container.innerHTML = '';
    
    // Usar forEach para recorrer y mostrar cada FAQ
    faqs.forEach(faq => {
        // Crear el elemento de pregunta
        const question = document.createElement("div");
        question.className = "faq-question";
        question.textContent = faq.pregunta;
        
        // Crear el elemento de respuesta
        const answer = document.createElement("div");
        answer.className = "faq-answer";
        answer.textContent = faq.respuesta;
        
        // Crear el contenedor para cada par pregunta-respuesta
        const faqItem = document.createElement("div");
        faqItem.className = "faq-item";
        
        // Agregar los elementos al contenedor
        faqItem.appendChild(question);
        faqItem.appendChild(answer);
        container.appendChild(faqItem);
        
        // Agregar evento de clic para mostrar/ocultar la respuesta
        question.addEventListener('click', function() {
            this.classList.toggle('active');
            answer.classList.toggle('active');
        });
    });
}
