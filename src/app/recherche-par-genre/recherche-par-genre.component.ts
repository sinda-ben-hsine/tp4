import { Component, OnInit } from '@angular/core';
import { Films } from '../model/Film.model';
import { FilmService } from '../services/film.service';
import { Genre } from '../model/genre.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recherche-par-genre',
  templateUrl: './recherche-par-genre.component.html',
  styles: []
})
export class RechercheParGenreComponent implements OnInit {
  films: Films[] = []; // Initialisation de la liste de films
  genres: Genre[] = []; // Liste des genres
  idGen!: number; // Pour stocker l'ID du genre sélectionné
  allFilms: Films[] = [];
  searchTerm!:string; 
  // Pour stocker tous les films

  constructor(private filmService: FilmService, private router: Router) {}

  ngOnInit(): void {
    this.genres = this.filmService.listeGenres(); // Récupération des genres

    // Récupération des films
    this.films = this.filmService.listeFilms(); // Récupérer directement les films
    this.films = [...this.films]; // Stocker tous les films pour le filtrage
    console.log(this.films);
  }

  // Méthode pour supprimer un film
  supprimerFilm(prod: Films): void {
    const conf = confirm("Êtes-vous sûr de vouloir supprimer ce film ?");
    if (conf) {
      this.filmService.supprimerFilm(prod);
      this.films = this.films.filter(film => film.idFilm !== prod.idFilm); // Mise à jour de la liste des films
      console.log(`Le film ${prod.nomFilm} a été supprimé.`);
    }
  }

  // Méthode pour naviguer vers la page de modification
  modifierFilm(film: Films): void {
    this.router.navigate(['/updateFilm', film.idFilm]);
  }

  // Méthode pour gérer le changement de genre
  onChange(): void {
    console.log(this.idGen);
    this.films = this.filmService.rechercherParGenre(this.idGen);
    // Logique pour filtrer les films par genre peut être ajoutée ici
  }

  // Méthode pour filtrer les films par nom
  onKeyUp(filterText: string): void {
    this.films = this.allFilms.filter(item =>
      item.nomFilm.toLowerCase().includes(filterText.toLowerCase())
    );
  }
}
