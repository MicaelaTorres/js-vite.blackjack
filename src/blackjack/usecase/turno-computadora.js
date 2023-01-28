import { crearCartaHtml } from "./crear-carta-html";
import { pedirCarta } from "./pedir-carta"; 

/**
 * turno computadora
 * @param {number} puntosMinimos puntos minimos que la computadora necesita para ganar
 * @param {array <String>} deck  
 * @param {HTMLElement} puntosHTML elemento HTML para mostrar los puntos
 * @param {HTMLAreaElement} divCartasComputadora elemento HTML para mostrar las cartas
 */
export const turnoComputadora = (puntosMinimos, puntosHTML, deck) => {
    if (!puntosMinimos) throw new Error('puntos minimos es necesario');
    if (!puntosHTML) throw new Error ('Arguemento puntosHTML es necesario')
    
    let puntosComputadora = 0;
    
    do {
        const carta = pedirCarta (deck);

        puntosComputadora = puntosComputadora + valorCarta (carta);
        puntosHTML.innerText = puntosComputadora;
       
     const imgCarta =crearCartaHtml(carta)
        
        if (puntosMinimos > 21) {
            break;
        }
    } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <=21))
     
    setTimeout(() => {
        if( puntosComputadora === puntosMinimos ) {
            alert('Nadie gana :(');
        } else if ( puntosMinimos > 21 ) {
            alert('Computadora gana')
        } else if( puntosComputadora > 21 ) {
            alert('Jugador Gana');
        } else {
            alert('Computadora Gana')
        }
    }, 100 );
 }



