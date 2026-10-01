/* =========================================================
   REVISTA DIGITAL DEL ORGULLO PIURANO Y PERUANO
   JAVASCRIPT
   ========================================================= */


/* =========================================================
   ELEMENTOS
   ========================================================= */

const navbar = document.getElementById("navbar");

const navLinks = document.querySelectorAll(".nav-links a");

const secciones = [
    document.getElementById("introduccion"),
    document.getElementById("dpcc"),
    document.getElementById("ccss"),
    document.getElementById("arte"),
    document.getElementById("obras"),
    document.getElementById("videos"),
    document.getElementById("reflexion")
].filter(Boolean);


/* =========================================================
   1. BARRA: OCULTAR AL BAJAR / MOSTRAR AL SUBIR
   ========================================================= */

let ultimaPosicion = window.scrollY;

window.addEventListener(
    "scroll",
    () => {

        const posicionActual = window.scrollY;

        /*
         * Si estamos cerca del inicio,
         * la barra siempre permanece visible.
         */

        if (posicionActual <= 80) {

            navbar.classList.remove("navbar-oculta");

            ultimaPosicion = posicionActual;

            return;
        }


        /*
         * Si bajamos:
         * esconder barra.
         */

        if (posicionActual > ultimaPosicion) {

            navbar.classList.add("navbar-oculta");

        }


        /*
         * Si subimos:
         * mostrar barra.
         */

        else if (posicionActual < ultimaPosicion) {

            navbar.classList.remove("navbar-oculta");

        }


        ultimaPosicion = posicionActual;

    },
    {
        passive: true
    }
);


/* =========================================================
   2. NAVEGACIÓN SUAVE
   ========================================================= */

navLinks.forEach((link) => {

    link.addEventListener("click", (evento) => {

        evento.preventDefault();

        const destino = link.getAttribute("href");

        const seccion = document.querySelector(destino);

        if (!seccion) {
            return;
        }


        /*
         * Altura aproximada de la barra superior.
         * Así el título de la sección no queda oculto debajo
         * de la navegación.
         */

        const alturaNavbar = navbar.offsetHeight;

        const posicion =
            seccion.getBoundingClientRect().top +
            window.scrollY -
            alturaNavbar -
            15;


        window.scrollTo({
            top: posicion,
            behavior: "smooth"
        });


        /*
         * Actualizamos inmediatamente el botón seleccionado.
         */

        navLinks.forEach((item) => {
            item.classList.remove("activo");
        });

        link.classList.add("activo");

    });

});


/* =========================================================
   3. DETECTAR AUTOMÁTICAMENTE LA SECCIÓN ACTUAL
   ========================================================= */

function actualizarNavegacion() {

    const posicionActual =
        window.scrollY + navbar.offsetHeight + 100;


    let seccionActual = null;


    secciones.forEach((seccion) => {

        const inicio =
            seccion.offsetTop;

        const final =
            inicio + seccion.offsetHeight;


        if (
            posicionActual >= inicio &&
            posicionActual < final
        ) {

            seccionActual = seccion.id;

        }

    });


    /*
     * Si estamos muy arriba, Introducción será
     * el apartado seleccionado.
     */

    if (window.scrollY < 300) {

        seccionActual = "introduccion";

    }


    navLinks.forEach((link) => {

        const destino =
            link.getAttribute("href").substring(1);

        link.classList.toggle(
            "activo",
            destino === seccionActual
        );

    });

}


window.addEventListener(
    "scroll",
    actualizarNavegacion,
    {
        passive: true
    }
);


/* =========================================================
   4. DETECTAR AL CARGAR LA PÁGINA
   ========================================================= */

window.addEventListener(
    "load",
    () => {

        actualizarNavegacion();

    }
);


/* =========================================================
   5. BOTÓN "EXPLORAR REVISTA"
   ========================================================= */

const botonExplorar =
    document.querySelector(
        '.portada a[href="#introduccion"]'
    );


if (botonExplorar) {

    botonExplorar.addEventListener(
        "click",
        (evento) => {

            evento.preventDefault();

            const introduccion =
                document.getElementById("introduccion");

            if (!introduccion) {
                return;
            }


            const alturaNavbar =
                navbar.offsetHeight;


            const posicion =
                introduccion.getBoundingClientRect().top +
                window.scrollY -
                alturaNavbar -
                15;


            window.scrollTo({

                top: posicion,

                behavior: "smooth"

            });

        }
    );

}


/* =========================================================
   6. EVITAR QUE UN CLIC EN UN BOTÓN ACTIVE
      VARIAS COSAS A LA VEZ
   ========================================================= */

document.addEventListener(
    "click",
    (evento) => {

        const link =
            evento.target.closest(
                ".nav-links a"
            );


        if (!link) {
            return;
        }


        /*
         * Mostramos temporalmente la barra cuando
         * el usuario utiliza la navegación.
         */

        navbar.classList.remove(
            "navbar-oculta"
        );

    }
);


/* =========================================================
   7. SOPORTE PARA TECLADO
   ========================================================= */

navLinks.forEach((link) => {

    link.addEventListener(
        "keydown",
        (evento) => {

            if (
                evento.key === "Enter" ||
                evento.key === " "
            ) {

                link.click();

            }

        }
    );

});


/* =========================================================
   8. REGRESAR ARRIBA CON HOME
   ========================================================= */

window.addEventListener(
    "keydown",
    (evento) => {

        if (
            evento.key === "Home" &&
            !evento.ctrlKey &&
            !evento.shiftKey &&
            !evento.altKey
        ) {

            evento.preventDefault();

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }

    }
);


/* =========================================================
   FIN DEL SCRIPT
   ========================================================= */