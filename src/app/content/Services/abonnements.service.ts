import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AbonnementsService {

  constructor(private http:HttpClient) { }

  private getHeaders(): HttpHeaders {   let token: string | null = null; 


    if (typeof window !== 'undefined') { token = sessionStorage.getItem('accessToken');
     
    }
  return new HttpHeaders({
     'Authorization': ` ${token}`
   });}

 // Méthode pour récupérer les abonnements
  getAbo(){
    return this.http.get<{url: string}>(`${environment.backendURL}/Abonnements`, { headers:this.getHeaders()});
  }
  // Méthode pour récupérer les détails d'un abonnement spécifique
  getSubscription(sub : string){
    return this.http.get<{url: string}>(`${environment.backendURL}/Vizualisation/${sub}`, { headers:this.getHeaders()})
  }

  getTest():Observable<{ test: string | null }>{
    // Effectue une requête HTTP GET vers l'URL '/test' du serveur
    return this.http.get<{ test: string | null }>(`${environment.backendURL}/test`)
  }
  
  getEtat(subscriptionId: string): Observable<{ hasState: boolean }> {
    return this.http.get<{ hasState: boolean }>(`${environment.backendURL}/getEtat/${subscriptionId}`);
  }
 

  getHistorique(subscriptionId: string): Observable<Date[]> {
    return this.http.get<Date[]>(`${environment.backendURL}/getHistorique/${subscriptionId}`);
  }


  getVisualisationChoisie(subscriptionId: string, date: string){
    const queryParams = { params: { date: date }};
    return this.http.get<{url: string}>(`${environment.backendURL}/VisualisationChoisi/${subscriptionId}`, queryParams);
  }
}
