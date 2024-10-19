import { Injectable } from '@angular/core';
import { Films } from '../model/Film.model';
import { Genre } from '../model/genre.model';


@Injectable({
  providedIn: 'root'
})
export class FilmService {
  films: Films[]; // Liste des films
  genres : Genre[];
  filmsRecherche : Films[]=[];

  constructor() {
    this.genres=[
      {idGen : 1, nomGen : "Action"},
      {idGen : 2, nomGen : "Romantique"}
    ];
    console.log("Création du service Film !");
    // Initialisation de la liste des films avec des exemples
    this.films = [
      { idFilm: 1, nomFilm: "Harry Potter", dureeFilm: 159, dateSortir: new Date("2001-01-16") ,
      genre:  {idGen : 1, nomGen : "Action"} },
      { idFilm: 2, nomFilm: "Sous la seine", dureeFilm: 101, dateSortir: new Date("2024-06-05") ,
    genre :  {idGen : 2, nomGen : "Romantique"} },
      { idFilm: 3, nomFilm: "En plein vol", dureeFilm: 107, dateSortir: new Date("2024-01-12"), 
    genre:  {idGen : 1, nomGen : "Action"} }
    ];
  }

  // Retourne la liste des films
  listeFilms(): Films[] {
    return this.films;
  }

  // Ajoute un nouveau film à la liste
 // Dans FilmService
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
  // Trie la liste des films par leur ID
trierFilms() {
  this.films = this.films.sort((n1, n2) => {
    if (n1.idFilm != null && n2.idFilm != null) { // Vérifie si les idFilm ne sont pas null ou undefined
      if (n1.idFilm > n2.idFilm) {
        return 1;
      }
      if (n1.idFilm < n2.idFilm) {
        return -1;
      }
    }
    return 0; // Renvoie 0 si les deux idFilm sont égaux ou l'un des deux est undefined
  });
}


  // Met à jour un film
  updateFilm(film: Films) {
    const existingFilmIndex = this.films.findIndex(f => f.idFilm === film.idFilm);
    if (existingFilmIndex !== -1) {
      this.films[existingFilmIndex] = film; // Remplacer le film existant par le nouveau
    } else {
      this.ajouterFilm(film); // Si le film n'existe pas, l'ajouter
    }
    this.trierFilms(); // Trie la liste après mise à jour
  }
  listeGenres():Genre[] {
    return this.genres;
    }

  consulterGenres(id:number): Genre{
    return this.genres.find(gen => gen.idGen == id)!;
    }
    rechercherParGenre(idGen: number): Films[]{
      this.filmsRecherche = [];
      this.films.forEach((cur, index) => {
      if(idGen == cur.genre.idGen) {
      console.log("cur "+cur);
      this.filmsRecherche.push(cur);
      }
      });
      return this.filmsRecherche;
      }
}
