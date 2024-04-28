import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor(private http: HttpClient) {}

  verifyToken(): Observable<boolean> {
    return this.http.get<{ authenticated: boolean }>(`${environment.backendURL}/VerifierToken`, { withCredentials: true })
      .pipe(
        catchError(() => of({ authenticated: false })), 
        map (response => response.authenticated)
      );
  }
}
