import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-process-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.css'],
})
export class TokenComponent implements OnInit {
  constructor(private router: Router) {}


  ngOnInit() {
    // Vérifie si le code s'exécute côté client (navigateur)
    if (typeof window !== 'undefined') {
      // Obtient la partie de hachage de l'URL
      const hash = window.location.hash.substr(1);
      // Analyse les paramètres de la partie de hachage pour extraire les données
      const params = hash.split('&').reduce<Record<string, string>>((acc, current) => {
        const [key, value] = current.split('=');
        acc[key] = decodeURIComponent(value); 
        return acc;
      }, {});
      // Récupère les données du token, de l'utilisateur et d'autres informations s'ils existent
    
      const email = params['email'];
      const nom = params['nom'];
      // Stocke le token dans le sessionStorage s'il existe
      
      // Stocke l'ID de l'utilisateur dans le sessionStorage s'il existe
      if (email) {
        sessionStorage.setItem('email', email);
      }
       // Stocke d'autres informations dans le sessionStorage si elles existent
      if (nom) {
        sessionStorage.setItem('nom', nom);
      }
       // Redirige l'utilisateur vers '/content' après 2 secondes
      setTimeout(() => {
       // window.location.hash = '';
       // window.location.href = '/content';
        // Redirection vers '/content'
       this.router.navigateByUrl(environment.redirectURL);
      }, 2000);
    }
  }
}
