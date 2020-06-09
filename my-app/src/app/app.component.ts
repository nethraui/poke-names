import { Component, ViewChild, ElementRef, Inject } from '@angular/core';
import { PokeApiService } from './poke-api.service';
import { Comments } from './classes/comments';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule} from '@angular/flex-layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Pokedex';
  nextUrl = '';
  previousUrl = '';
  isNext = false;
  isPrevious = false;

  constructor( private api:PokeApiService, private route:ActivatedRoute){ 
  }

  lstcomments:Comments[];
  
  clickNext(){
    this.isNext = true;
    this.isPrevious = false;
    this.ngOnInit();
  }

  clickPrevious(){
    this.isPrevious = true;
    this.isNext = false;
    this.ngOnInit();
  }

  ngOnInit(){
    if(!this.isNext && !this.isPrevious){
      this.api.getPokeList()
      .subscribe(
        (data) =>
        {
          this.nextUrl = data.next;
          this.previousUrl = data.previous;
          console.log(this.nextUrl);
          console.log(this.previousUrl);
          for(let i = 0; i < data.results.length; i++){
            data.results[i].id = data.results[i].url.split('/')[data.results[i].url.split('/').length -2];
            data.results[i].url = data.results[i].url.split('/')[data.results[i].url.split('/').length -2];
            data.results[i].imageUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+data.results[i].url+".png";
          }
          this.displayPokemon(data.results);
        }
      )
    }
     
    if(this.nextUrl != null && this.isNext){
        this.api.getNextPokeList(this.nextUrl)
      .subscribe(
        (data) =>
        {
          this.nextUrl = data.next;
          this.previousUrl = data.previous;
          console.log(this.nextUrl);
          console.log(this.previousUrl);
          for(let i = 0; i < data.results.length; i++){
            data.results[i].url = data.results[i].url.split('/')[data.results[i].url.split('/').length -2];
            data.results[i].imageUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+data.results[i].url+".png";
          }
          this.displayPokemon(data.results);
        }
      )
    }

    if(this.previousUrl != null && this.isPrevious){
        this.api.getPreviousPokeList(this.previousUrl)
      .subscribe(
        (data) =>
        {
          this.nextUrl = data.next;
          this.previousUrl = data.previous;
          console.log(this.nextUrl);
          console.log(this.previousUrl);
          for(let i = 0; i < data.results.length; i++){
            data.results[i].url = data.results[i].url.split('/')[data.results[i].url.split('/').length -2];
            data.results[i].imageUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+data.results[i].url+".png";
          }
          this.displayPokemon(data.results);
        }
      )
      }
  }
   
  displayPokemon = (pokemon: Comments[]) => {
    console.log(pokemon);
    //console.log(pokemon.sprites.front_default);
    this.lstcomments = pokemon;
  }
}




