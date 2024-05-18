import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbonnementComponent } from './abonnement/abonnement.component';
import { LeftBarComponent } from './left-bar/left-bar.component';
import { RightBarComponent } from './right-bar/right-bar.component';
import { BackgroundComponent } from './background/background.component';
import { GraphiqueComponent } from './graphique/graphique.component';
import { ContentComponent } from './content.component';
import { RouterModule, Routes } from '@angular/router';
import { ListeHistoriqueComponent } from './liste-historique/liste-historique.component';
import { VisualisationComponent } from './visualisation/visualisation.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';

// Définition des routes pour le module Content
const routes: Routes = [      

  {       

    path: '', component: ContentComponent,
  
    children: [{ path: 'abonnement', component: GraphiqueComponent },
    { path: 'Historique', component: ListeHistoriqueComponent },
    { path: 'Visualisation/:date', component: VisualisationComponent },
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
  imports: [NgSelectModule,
    ReactiveFormsModule,
    CommonModule,// Import du CommonModule pour les fonctionnalités communes
    RouterModule.forChild(routes)  // Import du RouterModule pour les routes définies dans le module enfant
  ]
})
export class ContentModule { }