import { Component, OnInit } from '@angular/core';
import { AbonnementsService } from '../Services/abonnements.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';




// Définition de l'interface pour représenter un abonnement
interface Subscription {
  id: string;
  nom: string;
  historique :boolean,
}


@Component({
  selector: 'app-abonnement',
  templateUrl: "./abonnement.component.html", // Chemin vers le template HTML du composant
  styleUrl: './abonnement.component.css' // Chemin vers le fichier CSS du composant
})
export class AbonnementComponent implements OnInit {
  isLoading = true ;
  p = 0; // Indice de la page actuelle
  Subscriptions: Subscription[] =  []; // Liste des abonnements
  collection: Subscription[] = []; // Collection d'abonnements pour la pagination

  errorMessage: string | null = null;

   
   constructor(private service:AbonnementsService, private router : Router,private title: Title) {
  
  }
  ngOnInit(): void {
    // Appel de la méthode pour récupérer les abonnements lors de l'initialisation du composant
    this.title.setTitle('Your subscriptions | Azure Resource Visualizer');
this.getAbonnements()  }
  // Méthode pour récupérer les abonnements depuis le service
  getAbonnements() {
    this.isLoading = true;
    this.service.getAbo().subscribe({
      next: (data) => {
        if (Array.isArray(data)){
          // Mappe les données reçues en instances de l'interface Subscription
          this.Subscriptions = data.map(item => ({
            id: item.id,
            nom: item.name,
            historique:false
        }))
        
        ;}
        this.Subscriptions.forEach(subscription => {
          this.traiterEtat(subscription)     
        console.log()   });
        // Initialise la collection pour la pagination
        this.initialiserCollection();
      
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        // Gestion des erreurs
        this.errorMessage = err.error.error || "Error accessing subscriptions";
        this.isLoading = false;
      }    });
  }


 
 // Méthode pour initialiser la collection d'abonnements pour la pagination
  initialiserCollection(): void {
    this.collection = this.Subscriptions.slice(this.p * 3, this.p * 3 + 3);
    
   
  }
 // Méthode pour passer à la page suivante
  pagedroite(): void {
    if (this.p < (this.Subscriptions.length / 3) - 1) {
      this.p=this.p+1;
      this.initialiserCollection(); 
    }
  }
// Méthode pour passer à la page précédente
  pagegauche(): void {
    if (this.p > 0) {
      this.p=this.p-1;
      this.initialiserCollection();
    }

}

traiterEtat(subscription: Subscription) {
  this.service.getEtat(subscription.id).subscribe({
    next: (response) => {
      if (response.hasState) {
        subscription.historique=true
      } 
    },
    error: (err) => {
      console.error('Erreur lors de la récupération de l\'état:', err);
    }
  });
}


 // Méthode pour naviguer vers la page de graphique d'un abonnement
navigateToGraphique(id: string, nom: string) {
  this.router.navigate([`/content/abonnement`], { queryParams: { nom: nom,id: id } });


  //window.location.href = `/abonnement/${id}`;

}
navigateToHistorique(id: string, nom: string){ this.router.navigate([`/content/Historique`], { queryParams: { nom: nom,id: id } });}
}