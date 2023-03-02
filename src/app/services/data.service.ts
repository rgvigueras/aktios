import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ServicePerson } from '../interfaces/person';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getPersonData(): Observable<ServicePerson> {
    return this.http
      .get<ServicePerson>(
        'https://storage.googleapis.com/web-aktios/entrevista-tecnica/info-population.json'
      )
      .pipe(catchError((error: HttpErrorResponse) => throwError(() => error)));
  }
}
