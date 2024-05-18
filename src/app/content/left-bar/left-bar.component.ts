import { Component, OnInit } from '@angular/core';
import { Router, Event as RouterEvent, NavigationEnd, ActivatedRoute } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-left-bar',
  templateUrl: './left-bar.component.html',
  styleUrl: './left-bar.component.css'
})
export class LeftBarComponent implements OnInit {
  id: string= '';
  nom: string ='';
  leftBarVisible: boolean = false;  // Indique si la barre latérale est visible ou non
  // Méthode pour basculer la visibilité de la barre latérale
  toggleLeftBar(): void {
    this.leftBarVisible = !this.leftBarVisible;
  }
   // Indicateur de test pour une condition spécifique
  test: boolean = false;
  testH: boolean = true;
  testA: boolean = true;

  constructor(private router: Router,private msalService: MsalService,    private route: ActivatedRoute
  ) { }// Injection de dépendance du service Router


  ngOnInit() {     
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      this.nom=params['nom']})
     
      // Récupère le nom de l'abonnement depuis les paramètres de l'URL
this.test=this.fn()  // Appel de la fonction fn pour déterminer la valeur de test
    
    

  }
   // Méthode pour déterminer la valeur de test en fonction de l'URL de la navigation

  fn(): boolean {
    this.router.events.pipe(
      // Filtre les événements de navigation pour obtenir seulement la fin de la navigation
      filter((event: RouterEvent): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {if(event.url.includes('/Historique?')){this.testH=true;this.testA=false 
     
    }else if(event.url.includes('/abonnement?')){this.testA=true;this.testH=false
    
    }else{this.testH=false ;this.testA=false}
      // Vérifie si l'URL de la navigation contient '/abonnement/'
      return this.test = event.url.includes('/abonnement?')||event.url.includes('/Historique?')||event.url.includes('/Visualisation/');
    });

    return false 
   

  }

  logout(): void {   sessionStorage.clear(); 
  
    this.msalService.logout({
      postLogoutRedirectUri: '/login'
    });  }
  


    navigateToGraphique() {
     
        
        // Navigue vers la nouvelle URL avec les paramètres requis
        this.router.navigate([`/content/abonnement`], { queryParams: { nom: this.nom,id: this.id } });
      
    }
    
    navigateToHistorique(){  // Récupère les paramètres de l'URL
    
      this.router.navigate([`/content/Historique`], { queryParams: { nom: this.nom,id: this.id } });
    }
    

}



