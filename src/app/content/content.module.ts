import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbonnementComponent } from './abonnement/abonnement.component';
import { LeftBarComponent } from './left-bar/left-bar.component';
import { RightBarComponent } from './right-bar/right-bar.component';
import { BackgroundComponent } from './background/background.component';
import { GraphiqueComponent } from './graphique/graphique.component';
import { ContentComponent } from './content.component';
import { RouterModule, Routes } from '@angular/router';

// Définition des routes pour le module Content
const routes: Routes = [      

  {       

    path: '', component: ContentComponent,
  
    children: [{ path: 'abonnement/:nom', component: GraphiqueComponent },
    { path: 'abonnements', component: AbonnementComponent },
    { path: '**', redirectTo: '/content/abonnements' },
      { path: '', redirectTo: 'abonnements', pathMatch: 'full' },

    ]
  },
  {   path: '**',redirectTo:'' }
];

@NgModule({
   // Déclaration des composants utilisés dans le module ContentModule
  declarations: [
    AbonnementComponent,
    LeftBarComponent,
    RightBarComponent,
    BackgroundComponent,
    GraphiqueComponent,
    ContentComponent
  ],
  imports: [
    CommonModule,// Import du CommonModule pour les fonctionnalités communes
    RouterModule.forChild(routes)  // Import du RouterModule pour les routes définies dans le module enfant
  ]
})
export class ContentModule { }