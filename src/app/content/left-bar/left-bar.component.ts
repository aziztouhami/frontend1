import { Component, OnInit } from '@angular/core';
import { Router, Event as RouterEvent, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-left-bar',
  templateUrl: './left-bar.component.html',
  styleUrl: './left-bar.component.css'
})
export class LeftBarComponent implements OnInit {

  leftBarVisible: boolean = false;  // Indique si la barre latérale est visible ou non
  // Méthode pour basculer la visibilité de la barre latérale
  toggleLeftBar(): void {
    this.leftBarVisible = !this.leftBarVisible;
  }
   // Indicateur de test pour une condition spécifique
  test: boolean = false;

  constructor(private router: Router) { }// Injection de dépendance du service Router


  ngOnInit() {      
this.test=this.fn()  // Appel de la fonction fn pour déterminer la valeur de test
    
    

  }
   // Méthode pour déterminer la valeur de test en fonction de l'URL de la navigation

  fn(): boolean {
    this.router.events.pipe(
      // Filtre les événements de navigation pour obtenir seulement la fin de la navigation
      filter((event: RouterEvent): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Vérifie si l'URL de la navigation contient '/abonnement/'
      return this.test = event.url.includes('/abonnement/');
    });

    return false 
   

  }
  
}



