import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AuthentificationService } from '../Services/authentification.service';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';
import { Router } from  '@angular/router';;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  

})
export class LoginComponent implements OnInit {
  ErrorMessage=""; // Variable pour stocker les messages d'erreur
  private msalInstance: IPublicClientApplication;

  constructor(private router: Router,private route: ActivatedRoute,private msalService:MsalService) {
    this.msalInstance = this.msalService.instance;
  }

  async ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['error']) {
        this.ErrorMessage = params['error'];
      }
    });

    try {
      // Appel d'initialize si disponible et nécessaire
      if (this.msalInstance.initialize) {
        await this.msalInstance.initialize();
      }
      const result = await this.msalInstance.handleRedirectPromise();
      if (result) {
        if (result.accessToken) {
      
          sessionStorage.setItem('accessToken', result.accessToken);
        }
        if (result.account && result.account.username) {
          sessionStorage.setItem('email', result.account.username);
        }
        if (result.account && result.account.name) {
          sessionStorage.setItem('nom', result.account.name);
        }  
      this.router.navigateByUrl(environment.redirectURL);}
      
  
         else {
        console.log('No result from handleRedirectPromise');
      }
    } catch (error) {
      console.error('Error in redirect handling', error);
      this.ErrorMessage = "Une erreur est survenue lors du traitement de la redirection.";
    }
  }


  // Méthode appelée lors du clic sur le bouton de connexion
  signIn(): void {
    this.msalInstance.loginRedirect({ scopes: ['https://management.azure.com/.default'] });
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