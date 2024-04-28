import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent implements OnInit {
  ErrorMessage=""; // Variable pour stocker les messages d'erreur

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
     // Souscrit aux modifications des paramètres de l'URL
    this.route.queryParams.subscribe((params) => {
        // Affiche le message d'erreur reçu dans la console
      console.log(this.ErrorMessage)
      // Vérifie s'il y a une erreur dans les paramètres de l'URL
      if (params['error']) {
        // Si une erreur est présente, la stocke dans ErrorMessage
        this.ErrorMessage = params['error'];
        console.log(this.ErrorMessage)
      }

    });
  }
  // Méthode appelée lors du clic sur le bouton de connexion
  login():void{
    // Redirige vers l'URL de connexion
  window.location.href = `${environment.backendURL}/signin`;


  }


/*constructor(private http: HttpClient, ) {}


login(): void {
  this.http.get('http://localhost:3000/signin', { withCredentials: true, observe: 'response' })
    .subscribe({
      next: (resp) => {
        // Gérez ici la redirection ou la réponse, selon votre backend
        // Par exemple, si votre backend répond avec une URL de redirection:
        // this.router.navigate(['/some-path']); pour naviguer programmatiquement
        console.log(resp);

      },
      error: (error) => {
        console.error('Login error:', error);
        // Gérez les erreurs ici, par exemple, afficher un message à l'utilisateur
      }
    });*/


  }