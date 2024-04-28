import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule,Routes } from '@angular/router';
import {provideClientHydration} from '@angular/platform-browser';
import { TokenComponent } from './token/token.component';


// Définition des routes spécifiques pour le module de connexion 
const routes: Routes = [
   // Route par défaut, affiche le composant LoginComponent
  { path: '', component: LoginComponent } ,
  // Route pour afficher le composant TokenComponent 
  { path: 'token', component: TokenComponent },
    // Redirection vers la page de connexion si l'URL ne correspond à aucune route définie 
  //{ path: '**', redirectTo: '/login' },


];
@NgModule({
  declarations: [
    // Déclaration des composants du module de connexion
    LoginComponent,
    TokenComponent
  ],


  imports: [
    // Import des modules requis pour ce module 
    CommonModule,
  RouterModule.forChild(routes) , // Configuration des routes spécifiques au module de connexion

  ],
   // Fourniture des services spécifiques à ce module
  providers: [provideClientHydration()], // Fournit un service pour l'hydratation côté client 
  // transformation d'une page web statique en une application web interactive
  
})

export class LoginModule {}


