/*
* 2C = Two of Clubs (Tréboles)
* 2D = Two of Diamonds
* 2H = Two of Hearts (Tréboles)
* 2S = Two of Spades (Tréboles)
* */

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

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

// Esta función me permite tomar una carte

const pedirCarta = () => {

    if ( deck.length === 0 ) {
        throw 'No hay cartas en el deck'
    }

    const carta = deck.pop();

    console.log( deck );
    console.log( carta ); // Carta debe de ser de la baraja

    return carta;
}

// pedirCarta();

const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);

    if (isNaN(valor)) {
        return valor === 'A' ? 11 : 10;
    } else {
        console.log('Es un número');
        return Number(valor);
    }
}

// Eventos
