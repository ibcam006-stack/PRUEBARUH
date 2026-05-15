
const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
// ===============================
// HEADER EFECTO SCROLL
// ===============================

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if(header){

        // EFECTO BACKGROUND
        if(window.scrollY > 50){

            header.classList.add("active");

        }else{

            header.classList.remove("active");

        }

        // OCULTAR HEADER
        if(window.scrollY > 20){

            header.classList.add("hide");

        }else{

            header.classList.remove("hide");

        }

    }

});


// ===============================
// ANIMACIÓN SUAVE AL CARGAR
// ===============================

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});


// ===============================
// MENÚ MOBILE
// ===============================

const menuToggle = document.getElementById("menu-toggle");

const navbar = document.getElementById("navbar");

if (menuToggle && navbar) {

    menuToggle.addEventListener("click", () => {

        navbar.classList.toggle("mobile-active");

    });

}


// ===============================
// CERRAR MENU AL DAR CLICK
// ===============================

const navLinks = document.querySelectorAll(".navbar a");

navLinks.forEach(link => {

    link.addEventListener("click", function(e){

        const targetId = this.getAttribute("href");

        // SCROLL SUAVE
        if(targetId.startsWith("#")){

            e.preventDefault();

            const target = document.querySelector(targetId);

            if(target){

                target.scrollIntoView({
                    behavior: "smooth"
                });

            }

        }

        // CERRAR MENU EN MOBILE
        if(window.innerWidth <= 768){

            navbar.classList.remove("mobile-active");

        }

    });

});


// ===============================
// BOTÓN CHAT
// ===============================

const chatButton = document.querySelector(".chat-button");

if (chatButton) {

    chatButton.addEventListener("click", () => {

        alert("Chat próximamente disponible.");

    });

}


// ===============================
// PARALLAX HERO IMAGE
// ===============================

const heroImage = document.querySelector(".hero-image img");

if (heroImage && window.innerWidth > 768) {

    window.addEventListener("scroll", () => {

        const scroll = window.scrollY;

        heroImage.style.transform =
            `translateY(${scroll * 0.08}px)`;

    });

}


// ===============================
// FIREBASE CONFIG
// ===============================
const firebaseConfig = {

    apiKey: "AIzaSyD-ZuIk80pjmS0eGRvbda_n1k6ihjKbSXs",

    authDomain: "revista-bfaa2.firebaseapp.com",

    projectId: "revista-bfaa2",

    storageBucket: "revista-bfaa2.firebasestorage.app",

    messagingSenderId: "686451444613",

    appId: "1:686451444613:web:b4964e15160aa5747392ec",

    measurementId: "G-9N8T4P05HV"

};


// ===============================
// FIREBASE INIT (SEGURO)
// ===============================

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});


// ===============================
// LOGIN GOOGLE CORREGIDO
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    const googleLogin = document.getElementById("google-login");

    if (!googleLogin) return;

    googleLogin.addEventListener("click", async () => {

        try {

            const result = await auth.signInWithPopup(provider);

            const user = result.user;

            console.log("LOGIN OK:", user);

            alert(`Bienvenido ${user.displayName}`);

            // Cambiar botón
            googleLogin.innerHTML = `Hola, ${user.displayName}`;

        } catch (error) {

            console.log("ERROR FIREBASE COMPLETO:", error);

            alert("Error: " + error.message);

        }

    });

});


// ===============================
// DETECTAR USUARIO LOGEADO
// ===============================

auth.onAuthStateChanged((user) => {

    if (user) {

        console.log("Usuario activo:", user.displayName);

        if (googleLogin) {

            googleLogin.innerHTML =
                `Hola, ${user.displayName}`;

        }

    }

});


// ===============================
// EFECTO REVEAL CARDS
// ===============================

const cards = document.querySelectorAll(".article-card");

const revealCards = () => {

    const triggerBottom = window.innerHeight * 0.9;

    cards.forEach(card => {

        const cardTop = card.getBoundingClientRect().top;

        if(cardTop < triggerBottom){

            card.style.opacity = "1";

            card.style.transform = "translateY(0px)";

        }

    });

};


// ESTILOS INICIALES

cards.forEach(card => {

    card.style.opacity = "0";

    card.style.transform = "translateY(40px)";

    card.style.transition = "all 0.8s ease";

});

window.addEventListener("scroll", revealCards);

window.addEventListener("load", revealCards);

// ===============================
// MODAL ARTÍCULOS
// ===============================

const modal = document.getElementById("article-modal");

const modalTitle = document.getElementById("modal-title");

const modalText = document.getElementById("modal-text");

const modalClose = document.getElementById("modal-close");


// TODOS LOS BOTONES LEER MÁS

const readButtons = document.querySelectorAll(".read-more");


// CONTENIDO

const articlesContent = [

    {
        title: "Liga Universitaria",

        text: `Aquí puedes poner toda la información completa del artículo.
        
Puedes escribir muchísimo texto.

El modal tendrá scroll automático y permitirá seguir leyendo sin romper el diseño.

También puedes separar párrafos normalmente.`
    },

    {
        title: "Juguetón",

        text: `Texto completo de Juguetón...`
    },

    {
        title: "Copa ESH",

        text: `Texto completo de Copa ESH...`
    },

    {
        title: "Primer Informe de Actividades",

        text: `Texto completo del informe...`
    },

    {
        title: "Carrera",

        text: `Texto completo de la carrera...`
    }

];


// ABRIR MODAL

readButtons.forEach((button, index) => {

    button.addEventListener("click", (e) => {

        e.preventDefault();

        modalTitle.textContent =
            articlesContent[index].title;

        modalText.textContent =
            articlesContent[index].text;

        modal.classList.add("show");

        document.body.style.overflow = "hidden";

    });

});


// CERRAR MODAL

modalClose.addEventListener("click", () => {

    modal.classList.remove("show");

    document.body.style.overflow = "auto";

});


// CERRAR DANDO CLICK AFUERA

modal.addEventListener("click", (e) => {

    if(e.target === modal){

        modal.classList.remove("show");

        document.body.style.overflow = "auto";

    }

});