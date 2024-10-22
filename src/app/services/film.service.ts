import { Injectable } from '@angular/core';
import { Films } from '../model/Film.model';
import { Genre } from '../model/genre.model';

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  films: Films[]; // Liste des films
  genres: Genre[];
  filmsRecherche: Films[] = [];

  constructor() {
    this.genres = [
      { idGen: 1, nomGen: 'Action' },
      { idGen: 2, nomGen: 'Romantique' }
    ];
    console.log('Création du service Film !');

    // Initialisation de la liste des films avec des exemples
    this.films = [
      {
        idFilm: 1,
        nomFilm: 'Harry Potter',
        dureeFilm: 159,
        dateSortir: new Date('2001-01-16'),
        genre: { idGen: 1, nomGen: 'Action' },
        email: 'harry.potter@exemple.com' // Ajoute l'email ici
      },
      {
        idFilm: 2,
        nomFilm: 'Sous la seine',
        dureeFilm: 101,
        dateSortir: new Date('2024-06-05'),
        genre: { idGen: 2, nomGen: 'Romantique' },
        email: 'sous.laseine@exemple.com' // Ajoute l'email ici
      },
      {
        idFilm: 3,
        nomFilm: 'En plein vol',
        dureeFilm: 107,
        dateSortir: new Date('2024-01-12'),
        genre: { idGen: 1, nomGen: 'Action' },
        email: 'en.pleinvol@exemple.com' // Ajoute l'email ici
      }
    ];
  }

  // Retourne la liste des films
  listeFilms(): Films[] {
    return this.films;
  }

  // Ajoute un nouveau film à la liste
  ajouterFilm(film: Films): number {
    film.idFilm = this.films.length + 1; // Attribuer un nouvel ID (ajuste selon ta logique)
    this.films.push(film);
    this.trierFilms(); // Trie après ajout
    return film.idFilm; // Retourne l'ID du film ajouté
  }
  

  // Supprime un film de la liste
  supprimerFilm(film: Films) {
    const index = this.films.indexOf(film, 0);
    if (index > -1) {
      this.films.splice(index, 1);
    }
  }

  // Retourne un film par son ID
  consulterFilm(id: number): Films | undefined {
    return this.films.find(film => film.idFilm === id);
  }

  // Trie la liste des films par leur ID
  trierFilms() {
    this.films = this.films.sort((n1, n2) => n1.idFilm - n2.idFilm);
  }

  // Met à jour un film
  updateFilm(film: Films) {
    const existingFilmIndex = this.films.findIndex(f => f.idFilm === film.idFilm);
    if (existingFilmIndex !== -1) {
      this.films[existingFilmIndex] = film; // Remplace le film existant
    } else {
      this.ajouterFilm(film); // Si le film n'existe pas, l'ajoute
    }
    this.trierFilms(); // Trie la liste après mise à jour
  }

  // Retourne la liste des genres
  listeGenres(): Genre[] {
    return this.genres;
  }

  // Retourne un genre par son ID
  consulterGenres(id: number): Genre {
    return this.genres.find(gen => gen.idGen === id)!;
  }

  // Recherche des films par genre
  rechercherParGenre(idGen: number): Films[] {
    this.filmsRecherche = this.films.filter(film => film.genre.idGen === idGen);
    return this.filmsRecherche;
  }
}
