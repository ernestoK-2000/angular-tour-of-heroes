import { Injectable } from '@angular/core';
import { IHero } from './Ihero';
//import { HEROES } from './mock-heroes';
import {Observable, of} from 'rxjs'
import { MessageService } from './message.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'api/heroes';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private messageService: MessageService,
    private http: HttpClient
    ) { }

  /** GET heroes from the server */
  getHeroes(): Observable<IHero[]>{
    return this.http.get<IHero[]>(this.heroesUrl)
      .pipe(tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<IHero[]>('getHeroes', []))
      );
  }

  handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
    }
  }

  getHero(id: number): Observable<IHero>{
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<IHero>(url)
      .pipe(
        tap(_ => this.log(`fetched hero id=${id}`)),
        catchError(this.handleError<IHero>(`getHero id=${id}`))
        );
  }

  updateHero(hero: IHero): Observable<any>{
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  addHero(hero: IHero): Observable<IHero>{
    return this.http.post<IHero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: IHero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<IHero>('addHero'))
    )
  }

  private log(message: string){
    this.messageService.add(`HeroService: ${message}`);
  }

  deleteHero(id: number): Observable<IHero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete<IHero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<IHero>('deleteHero'))
    );
  }

  searchHeroes(term: string): Observable<IHero[]>{
    if(!term.trim()){
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<IHero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x => x.length ? 
        this.log(`found heroes matching "${term}"`) : 
        this.log(`no heores matching "${term}"`)),
        catchError(this.handleError<IHero[]>('searchHeroes', []))
    );
  }
}
