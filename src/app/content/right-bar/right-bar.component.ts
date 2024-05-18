import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-right-bar',
  templateUrl: './right-bar.component.html',
  styleUrl: './right-bar.component.css'
})
export class RightBarComponent {
  UserName: string | null = ''; // Nom de l'utilisateur, initialisé à null
  Adresse: string | null = ''; // Adresse email de l'utilisateur, initialisée à null
  rightBarVisible: boolean = true; // Indique si la barre latérale droite est visible ou non
  // Méthode pour basculer la visibilité de la barre latérale droite
  toggleRightBar(): void {
    // Inverse la valeur de la propriété rightBarVisible
    this.rightBarVisible = !this.rightBarVisible;
}

  constructor(private http: HttpClient,private router: Router) {} // Constructeur du composant

  ngOnInit(): void {
    // Initialisation des propriétés UserName et Adresse à partir des données de session
    if (typeof window !== 'undefined') { // Vérifie si l'application s'exécute dans un environnement côté client
      this.UserName = sessionStorage.getItem('nom'); // Récupère le nom de l'utilisateur depuis la session
      this.Adresse = sessionStorage.getItem('email'); // Récupère l'adresse email de l'utilisateur depuis la session
    }
  }
  
}