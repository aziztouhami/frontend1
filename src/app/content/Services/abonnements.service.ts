import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AbonnementsService {

  constructor(private http:HttpClient) { }

 // Méthode pour récupérer les abonnements
  getAbo(){
    return this.http.get<{url: string}>(`${environment.backendURL}/Abonnements`, { withCredentials: true });
  }
  // Méthode pour récupérer les détails d'un abonnement spécifique
  getSubscription(sub : string){
    return this.http.get<{url: string}>(`${environment.backendURL}/Vizualisation/${sub}`, { withCredentials: true })
  }

  getTest():Observable<{ test: string | null }>{
    // Effectue une requête HTTP GET vers l'URL '/test' du serveur
    return this.http.get<{ test: string | null }>(`${environment.backendURL}/test`)
  }
  
}
