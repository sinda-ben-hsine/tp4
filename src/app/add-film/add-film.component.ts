import { Component } from '@angular/core';
import { Films } from '../model/Film.model';
import { FilmService } from '../services/film.service';
import { Router } from '@angular/router'; // Assure-toi d'importer Router
import { Genre } from '../model/genre.model';

@Component({
  selector: 'app-add-film',
  templateUrl: './add-film.component.html',
  styleUrls: ['./add-film.component.css'] // Corrige 'styleUrl' en 'styleUrls'
})
export class AddFilmComponent {
  newFilm = new Films();
  genres! : Genre[];
  newIdGen !: number;
  newGenre ! : Genre;
  message: string = '';

  constructor(private filmService: FilmService, private router: Router) { // Injecte le Router
  }
  ngOnInit():void{
    this.genres = this.filmService.listeGenres();

  }

  addFilm() {
    this.newGenre = this.filmService.consulterGenres(this.newIdGen);
    this.newFilm.genre = this.newGenre;
  
    // Ajouter le nouveau film et récupérer son ID
    const newFilmId = this.filmService.ajouterFilm(this.newFilm);
   
    // Naviguer vers la page de modification du film ajouté
    this.router.navigate(["/update-film", newFilmId]);
    
  }
  
}
  
