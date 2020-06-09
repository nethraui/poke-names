import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {
  apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor( private http:HttpClient ) { }

  getPokeList(): Observable<any>{
      return this.http.get(this.apiUrl);
  }

  getNextPokeList(nextUrl: string): Observable<any>{
    return this.http.get(nextUrl);
  }

  getPreviousPokeList(previousUrl: string): Observable<any>{
    return this.http.get(previousUrl);
  }
}
