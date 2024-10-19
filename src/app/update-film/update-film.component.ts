import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { FilmService } from '../services/film.service';
import { Films } from '../model/Film.model';
import { Genre } from '../model/genre.model';

@Component({
  selector: 'app-update-film',
  templateUrl: './update-film.component.html',
  styles: ``
})
export class UpdateFilmComponent implements OnInit {
  currentFilm: Films = new Films(); // Initialisation de currentFilm avec un objet
  genres!: Genre[];
  updatedGenID! : number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router :Router,

    private filmService: FilmService
  ) {}

  ngOnInit(): void {
    this.genres = this.filmService.listeGenres();
    const filmId = +this.activatedRoute.snapshot.params['id'];
    const foundFilm = this.filmService.consulterFilm(filmId);
  
    if (foundFilm) {
      this.currentFilm = foundFilm;  // Charger les informations actuelles du film
      this.updatedGenID = this.currentFilm.genre.idGen; // Pré-remplir le genre
    } else {
      console.log("Aucun film trouvé avec cet ID :", filmId);
    }
  }
  

  updateFilm() {
    this.currentFilm.genre = this.filmService.consulterGenres(this.updatedGenID);
    this.filmService.updateFilm(this.currentFilm); // Met à jour le film
    this.router.navigate(["films"]); // Redirige vers la liste des films
  }
  
}
