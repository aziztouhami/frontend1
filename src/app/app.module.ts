// Import des modules et des dépendances nécessaires
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PublicClientApplication, InteractionType } from '@azure/msal-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { LoginModule } from './login/login.module';
import { ContentModule } from './content/content.module';
import { environment } from '../environments/environment';
import { MsalModule,MsalInterceptor, MSAL_INSTANCE, MsalService, MSAL_INTERCEPTOR_CONFIG, MsalInterceptorConfiguration } from '@azure/msal-angular';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ListeHistoriqueComponent } from './content/liste-historique/liste-historique.component';
import { VisualisationComponent } from './content/visualisation/visualisation.component';

export function MSALInstanceFactory(): PublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: environment.clientId,
      authority: environment.authority,
      redirectUri: environment.redirectUri
    }
  });
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap: new Map([
      ['https://management.azure.com/', ['https://management.azure.com/.default']]
    ])
  };
}

@NgModule({
  // Déclarations des composants
  declarations: [
    AppComponent,
    ListeHistoriqueComponent,
    VisualisationComponent,
    
  ],
  imports: [
    // Import des modules externes 
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LoginModule,
    ContentModule,
    MsalModule 

  ],
  // Fourniture des services globaux pour l'ensemble de l'application 
  providers: [
    // Fourniture d'un client HTTP personnalisé utilisant l'API Fetch 
    provideHttpClient(withFetch()), // Ajoutez cette ligne pour activer fetch
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    MsalService
  ],
  // Définition du composant racine de l'application 
  bootstrap: [AppComponent]
})
export class AppModule { }
