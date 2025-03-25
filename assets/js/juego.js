
(() => {
    'use strict'


    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'];
    const especiales = ['A', 'J', 'Q', 'K'];

    let puntosJugador = 0,
        puntosComputadora = 0;

    //* Referencias del HTML
    // Botones
    const btnPedir = document.querySelector('#btnPedir');
    const btnDetener = document.querySelector('#btnDetener');
    const btnNuevoJuego = document.querySelector('#btnNuevo');

    // Puntos
    const puntosHTML = document.querySelectorAll('small');

    // Cartas
    const divCartasJugador = document.querySelector('#jugador-cartas');
    const divCartasComputadora = document.querySelector('#computadora-cartas');

    btnDetener.disabled = true;

    // Esta función crea una nueva baraja
    const crearDeck = () => {

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

        // console.log( deck );
        deck = _.shuffle(deck);
        return deck;
    }

    crearDeck();

    const reiniciarJuego = () => {

        btnNuevoJuego.disabled = true;

        // Reiniciar variables
        deck = [];
        deck = crearDeck();
        puntosJugador = 0;
        puntosComputadora = 0;

        // Actualizar interfaz
        puntosHTML[0].innerText = '0';
        puntosHTML[1].innerText = '0';

        // Limpiar cartas
        divCartasJugador.innerText = '';
        divCartasComputadora.innerText = '';

        // Restablecer estado de botones
        btnPedir.disabled = false;
        btnDetener.disabled = true;
    }

    // Esta función me permite tomar una carte

    const pedirCarta = () => {

        if ( deck.length === 0 ) {
            throw 'No hay cartas en el deck'
        }

        // Seleccionar la ultima carta del deck
        return deck.pop();
    }

    // pedirCarta();
    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1);

        if (isNaN(valor)) {
            return valor === 'A' ? 11 : 10;
        } else {
            return Number(valor);
        }
    }

    // Turno de la computadora
    const turnoComputadora = ( puntosMinimos ) => {

        do {
            const carta = pedirCarta();

            puntosComputadora += valorCarta( carta );

            // Seleccionar la imagen de la carta
            puntosHTML[1].innerText = puntosComputadora;

            // Crear imagen de la carta
            const imgCarta = document.createElement('img');
            imgCarta.src = `assets/cartas/${ carta }.png`;
            imgCarta.classList.add('carta');
            divCartasComputadora.append( imgCarta );

            if ( puntosMinimos > 21 ) {
                break;
            }
        } while( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21) );

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

    // Eventos
    btnPedir.addEventListener('click', () => {

        btnDetener.disabled = false;
        btnNuevoJuego.disabled = false;

        const carta = pedirCarta();

        puntosJugador += valorCarta( carta );

        // Seleccionar la imagen de la carta
        puntosHTML[0].innerText = puntosJugador;

        // Crear imagen de la carta
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${ carta }.png`;
        imgCarta.classList.add('carta');
        divCartasJugador.append( imgCarta );

        if (puntosJugador > 21) {
            console.warn('Lo siento mucho, perdiste');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora( puntosJugador );
        } else if (puntosJugador === 21) {
            console.warn('21, genial!');
            btnPedir.disabled = true;
            turnoComputadora(puntosJugador);
        }
    });

    btnDetener.addEventListener('click', () => {

        // Desactivar botones
        btnPedir.disabled = true;
        btnDetener.disabled = true;

        // Iniciar el turno de la computadora
        turnoComputadora(puntosJugador);

    });

    btnNuevoJuego.addEventListener('click', () => {
        console.clear()
        reiniciarJuego();

    });
})();



