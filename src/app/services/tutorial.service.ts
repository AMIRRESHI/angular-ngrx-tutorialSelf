import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable ,  of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Tutorial } from '@appModels/tutorial';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class TutorialService {

  private tutorialsUrl = 'api/tutorials';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET tutorials from the server */
  getTutorials (): Observable<Tutorial[]> {
    return this.http.get<Tutorial[]>(this.tutorialsUrl)
      .pipe(
        tap(tutorials => this.log(`fetched tutorials`)),
        catchError(this.handleError('getTutorials', []))
      );
  }

  /** GET tutorial by id. Return `undefined` when id not found */
  getTutorialNo404<Data>(id: number): Observable<Tutorial> {
    const url = `${this.tutorialsUrl}/?id=${id}`;
    return this.http.get<Tutorial[]>(url)
      .pipe(
        map(tutorials => tutorials[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} tutorial id=${id}`);
        }),
        catchError(this.handleError<Tutorial>(`getTutorial id=${id}`))
      );
  }

  /** GET tutorial by id. Will 404 if id not found */
  getTutorial(id: number): Observable<Tutorial> {
    const url = `${this.tutorialsUrl}/${id}`;
    return this.http.get<Tutorial>(url).pipe(
      tap(_ => this.log(`fetched tutorial id=${id}`)),
      catchError(this.handleError<Tutorial>(`getTutorial id=${id}`))
    );
  }

  /* GET tutorials whose name contains search term */
  searchTutorials(term: string): Observable<Tutorial[]> {
    if (!term.trim()) {
      // if not search term, return empty tutorial array.
      return of([]);
    }
    return this.http.get<Tutorial[]>(`api/tutorials/?name=${term}`).pipe(
      tap(_ => this.log(`found tutorials matching "${term}"`)),
      catchError(this.handleError<Tutorial[]>('searchTutorials', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new tutorial to the server */
  addTutorial (tutorial: Tutorial): Observable<Tutorial> {
    return this.http.post<Tutorial>(this.tutorialsUrl, tutorial, httpOptions).pipe(
      tap((tutorial: Tutorial) => this.log(`added tutorial w/ id=${tutorial.id}`)),
      catchError(this.handleError<Tutorial>('addTutorial'))
    );
  }

  /** DELETE: delete the tutorial from the server */
  deleteTutorial (tutorial: Tutorial | number): Observable<Tutorial> {
    const id = typeof tutorial === 'number' ? tutorial : tutorial.id;
    const url = `${this.tutorialsUrl}/${id}`;

    return this.http.delete<Tutorial>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted tutorial id=${id}`)),
      catchError(this.handleError<Tutorial>('deleteTutorial'))
    );
  }
  
  /** PUT: update the tutorial on the server */
  updateTutorial (tutorial: Tutorial): Observable<any> {
    return this.http.put(this.tutorialsUrl, tutorial, httpOptions).pipe(
      tap(_ => this.log(`updated tutorial id=${tutorial.id}`)),
      catchError(this.handleError<any>('updateTutorial'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a TutorialService message with the MessageService */
  private log(message: string) {
    this.messageService.add('TutorialService: ' + message);
  }
}
