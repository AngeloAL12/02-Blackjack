
const miModulo = (() => {
    'use strict'

    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
          especiales = ['A', 'J', 'Q', 'K'];

    let puntosJugadores = [];

    //* Referencias del HTML
    // Botones
    const btnPedir = document.querySelector('#btnPedir'),
          btnQuedarse = document.querySelector('#btnDetener'),
          btnNuevoJuego = document.querySelector('#btnNuevo');

    // Cartas
    const divCartasJugadores = document.querySelectorAll('.divCartas'),
          puntosHTML = document.querySelectorAll('small');

    const cartasIniciales = () => {
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j <  puntosJugadores.length; j++) {
                const carta = pedirCarta();
                acumularPuntos(carta, j);
                crearCarta(carta, j);
            }
        }
    }

    // Esta función inicializa el juego
    const inicializarJuego = ( numJugadores = 2 ) => {
        deck = crearDeck();

        puntosJugadores = [];
        for (let i = 0; i<numJugadores; i++) {
            puntosJugadores.push(0);
        }

        // Actualizar interfaz
        puntosHTML.forEach( elem => elem.innerText = 0);
        divCartasJugadores.forEach( elem => elem.innerHTML = '' );

        // Restablecer estado de botones
        btnPedir.disabled = false;
        btnQuedarse.disabled = true;

        // Repartir cartas iniciales
        cartasIniciales();
    }

    // Esta función crea una nueva baraja
    const crearDeck = () => {

        deck = [];
        for ( let i = 2; i<=10; i++ ) {
            for ( let tipo of tipos ) {
                deck.push( i + tipo );
            }
        }

        for (let tipo of tipos ) {
            for ( let esp of especiales ) {
                deck.push( esp + tipo );
            }
        }

        return _.shuffle(deck);
    }

    // Esta función me permite tomar una carte

    const pedirCarta = () => {

        if ( deck.length === 0 ) {
            throw 'No hay cartas en el deck'
        }

        // Seleccionar la ultima carta del deck
        return deck.pop();
    }

    const valorCarta = ( carta ) => {
        const valor = carta.substring(0, carta.length - 1);

        if (isNaN(valor)) {
            return valor === 'A' ? 11 : 10;
        } else {
            return Number(valor);
        }
    }

    // Turno: 0 = primer jugador y el último será la computadora
    const acumularPuntos = ( carta, turno ) => {

        puntosJugadores[turno] += valorCarta( carta );

        // Seleccionar la imagen de la carta
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores;
    }

    const crearCarta = ( carta, turno ) => {

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${ carta }.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append( imgCarta );
    }

    const determinarGanador = () => {

        const [ puntosMinimos, puntosComputadora ] = puntosJugadores;

        setTimeout(() => {
            if ( puntosComputadora === puntosMinimos ) {
                alert('Nadie gana :(');
            } else if ( puntosMinimos > 21 ) {
                alert('Computadora gana');
            } else if ( puntosComputadora > 21 ) {
                alert('Jugador Gana');
            } else {
                alert('Computadora Gana');
            }
        }, 100);
    }

    // Turno de la computadora
    const turnoComputadora = ( puntosMinimos ) => {

        let puntosComputadora =  0;

        do {
            const carta = pedirCarta();
            const turnoJugador = puntosJugadores.length - 1;

            puntosComputadora =  acumularPuntos(carta, turnoJugador)[turnoJugador];
            crearCarta(carta, turnoJugador);

        } while( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21) );

        determinarGanador();
    }


    // Eventos
    btnPedir.addEventListener('click', () => {

        btnQuedarse.disabled = false;
        btnNuevoJuego.disabled = false;

        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0);

        crearCarta(carta, 0);

        if (puntosJugador > 21) {
            console.warn('Lo siento mucho, perdiste');
            btnPedir.disabled = true;
            btnQuedarse.disabled = true;
            turnoComputadora( puntosJugador );
        } else if (puntosJugador === 21) {
            console.warn('21, genial!');
            btnPedir.disabled = true;
            turnoComputadora( puntosJugador );
        }
    });

    btnQuedarse.addEventListener('click', () => {

        // Desactivar botones
        btnPedir.disabled = true;
        btnQuedarse.disabled = true;

        // Iniciar el turno de la computadora
        turnoComputadora( puntosJugadores[0] );
    });

    btnNuevoJuego.addEventListener('click', () => {
        inicializarJuego();
    });

    return {
        nuevoJuego: inicializarJuego
    };
})();