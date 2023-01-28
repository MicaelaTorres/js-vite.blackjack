import _ from 'underscore';
import {crearDeck} from './crear-deck';
import {pedirCarta} from './pedir-carta';
import {valorCarta} from './valor-carta-html';
import {turnoComputadora} from './turno-computadora';
import {crearCartaHtml} from './crear-carta-html.js';

(() => {
  'use strict'    

   let deck         = [];
   const tipos      = ['C','D','H','S']
   const especiales = ['A','J','Q','K'];
  
   //let puntosJugador     = 0,
     //  puntosComputadora = 0;
   let puntosJugador = [];
      
  
   // Referencias del HTML
   const btnPedir   = document.querySelector('#btnPedir'),
         btnDetener = document.querySelector('#btnDetener'),
         btnNuevo   = document.querySelector('#btnNuevo');
  
   const divCartasJugador = document.querySelectorAll('.divCartas'),
         puntosHTML = document.querySelectorAll('small');
        
  // esta funcion inicializa el juego    
   const inicializarJuego = (numJugadores = 2 ) => {
      deck = crearDeck(tipos, especiales);
      puntosJugador = [];
      for (let i = 0; i< numJugadores; i++ ) {
         puntosJugador.push(0);
      }

      puntosHTML.forEach(elem => elem.innerText = 0);
      divCartasJugador.forEach(elem => elem.innerHTML = '');

      btnPedir.disabled   = false;
      btnDetener.disabled = false;
      
   }
  
  
   // Esta función crea un nuevo deck
   
   // deck = crearDeck(tipos, especiales);
  
   
    // Esta función me permite tomar una carta
   
   
   
   
   //turno: 0 = primer jugador y el ultimo sera la computadora
   const acumularPuntos = ( carta, turno) => {
     
      puntosJugador[turno] = puntosJugador[turno] + valorCarta( carta );
      puntosHTML[turno].innerText = puntosJugador[turno];
      return puntosJugador[turno]
   }

   const crearCarta = (carta ,turno) => {
      const imgCarta = document.createElement('img');
      imgCarta.src = `public/assets/cartas/${ carta }.png`; //3H, JD
      imgCarta.classList.add('carta');
      divCartasJugador [turno].append(imgCarta);
   }
      
   const determinarGanador = () => {
      const [puntosMinimos, puntosComputadora] = puntosJugador;
   }
       

   // turno de la computadora
   const turnoComputadora = ( puntosMinimos ) => {

      let puntosComputadora = 0;

      do {
         const carta = pedirCarta(deck);
         acumularPuntos(carta, puntosJugador.length-1);
         crearCarta(carta, puntosJugador.length-1);

         if( puntosMinimos > 21 ) {
            break;
         }
      } while( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21 ) );
      
      determinarGanador();
   }
  
  
  
   // Eventos
   btnPedir.addEventListener('click', () => {
  
      const carta = pedirCarta(deck);
      const puntosJugador = acumularPuntos(carta, 0);
      
      crearCarta(carta, 0);
  
      if ( puntosJugador > 21 ) {
         console.warn('Lo siento mucho, perdiste');
         btnPedir.disabled   = true;
         btnDetener.disabled = true;
         turnoComputadora( puntosJugador );
  
      } else if ( puntosJugador === 21 ) {
         console.warn('21, genial!');
         btnPedir.disabled   = true;
         btnDetener.disabled = true;
         turnoComputadora( puntosJugador );
      }
   });
  
  
   btnDetener.addEventListener('click', () => {
      btnPedir.disabled   = true;
      btnDetener.disabled = true;
  
      turnoComputadora( puntosJugador );
   });
  
   btnNuevo.addEventListener('click', () => {
      inicializarJuego();
   });
  
})();



