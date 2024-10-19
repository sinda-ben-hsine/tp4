import { Component, OnInit } from '@angular/core';
import { Films } from '../model/Film.model';
import { FilmService } from '../services/film.service';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrl: './films.component.css'
})
export class FilmsComponent implements OnInit {
  films: Films[];
  

  constructor(private filmService : FilmService) {
    this.films=[];
    
    
  }

  ngOnInit(): void {
    this.films = this.filmService.listeFilms();
    
  }
  supprimerFilm(prod : Films){
    //console.log(prod);
    let conf = confirm("Etes-vous sûr ?");
 if (conf)
    this.filmService.supprimerFilm(prod);


  }
}