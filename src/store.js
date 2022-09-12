// per creare l'oggetto observable ci serve la classe vue, quindi prima dobbiamo importarla
import Vue from 'vue';

// creiamo l'observable => state in generale è quel punto dell'applicativo dove ci salviamo tutte le variabili condivise da tutto l'applicativo.
const state = Vue.observable({
    movies: [],
    actionMovies: [],
    fantasyMovies: [],
    crimeMovies: [],
    tv: [],
    actionTv: [],
    fantasyTv: [],
    crimeTv: [],
    apiKey: '604eb69c5e2149adb681169e8dc9e532',
    query: '',
    baseUri: 'https://api.themoviedb.org/3',
    genres: [],
    genresTv: [],
    activeCat: 0
});

// esportiamo state per poterla importare negli altri componenti
export default state;