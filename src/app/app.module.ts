// Import des modules et des dépendances nécessaires
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { LoginModule } from './login/login.module';
import { ContentModule } from './content/content.module';

@NgModule({
  // Déclarations des composants
  declarations: [
    AppComponent
  ],
  imports: [
    // Import des modules externes 
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LoginModule,ContentModule
  ],
  // Fourniture des services globaux pour l'ensemble de l'application 
  providers: [
    // Fourniture d'un client HTTP personnalisé utilisant l'API Fetch 
    provideHttpClient(withFetch()), // Ajoutez cette ligne pour activer fetch
  ],
  // Définition du composant racine de l'application 
  bootstrap: [AppComponent]
})
export class AppModule { }
