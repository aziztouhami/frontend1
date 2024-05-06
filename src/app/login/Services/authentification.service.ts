import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor(private http:HttpClient) { }
  getToken(code: string): Observable<{ Email: string | null, Nom: string | null, Token: string | null }> {
    const headers = new HttpHeaders({'Code': code}); // Vérifiez si c'est le bon en-tête
    return this.http.get<{ Email: string | null, Nom: string | null, Token: string | null }>(
      `${environment.backendURL}/redirect`, 
      { headers: headers }
    );
  }

  getSignInUrl() {
    return this.http.get<{url: string}>(`${environment.backendURL}/signin`);
}
  
}
