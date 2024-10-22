import { Component } from '@angular/core';
import { Films } from '../model/Film.model';
import { FilmService } from '../services/film.service';
import { Router } from '@angular/router';
import { Genre } from '../model/genre.model';

@Component({
  selector: 'app-add-film',
  templateUrl: './add-film.component.html',
  styleUrls: ['./add-film.component.css']
})
export class AddFilmComponent {
  newFilm: Films = new Films();
  genres!: Genre[];
  newIdGen!: number;
  message: string = '';

  constructor(private filmService: FilmService, private router: Router) {}

  ngOnInit(): void {
    this.genres = this.filmService.listeGenres();
  }

  addFilm() {
    // Vérification des champs requis
    if (!this.newFilm.nomFilm || !this.newFilm.dureeFilm || !this.newFilm.dateSortir || !this.newIdGen || !this.newFilm.email) {
      this.message = "Veuillez remplir tous les champs requis.";
      return;
    }

    // Validation de l'email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex pour vérifier le format de l'email
    if (!emailPattern.test(this.newFilm.email)) {
      this.message = "Veuillez entrer un email valide.";
      return;
    }

    const newGenre = this.filmService.consulterGenres(this.newIdGen);
    this.newFilm.genre = newGenre;

    // Ajouter le nouveau film et récupérer son ID
    const newFilmId = this.filmService.ajouterFilm(this.newFilm);
  
    // Naviguer vers la page de modification du film ajouté
    this.router.navigate(["/update-film", newFilmId]);
  }
}
