import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { authorGuard } from './author.guard';

// Définition des routes de l'application
const routes: Routes = [  
  // Route pour afficher le contenu de l'application, protégée par le garde de navigation authorGuard   
  { path: 'content',canActivate:[authorGuard], loadChildren: () => import('./content/content.module').then(m => m.ContentModule) },
   // Route pour afficher la page de connexion, chargeant le module LoginModule de façon dynamique
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  // Redirection vers la page de connexion lorsque l'URL est vide
  { path: '', redirectTo: '/login', pathMatch: 'full' },

];


@NgModule({
   // Configuration du module de routage principal avec les routes définies précédemment
  imports: [RouterModule.forRoot(routes)],
  // Export du module de routage pour pouvoir l'utiliser dans d'autres modules de l'application 
  exports: [RouterModule]
})
export class AppRoutingModule { }
