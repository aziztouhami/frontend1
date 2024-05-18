import { Component, OnInit } from '@angular/core';
import { AbonnementsService } from '../Services/abonnements.service';
import { ActivatedRoute,Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-liste-historique',
  templateUrl: './liste-historique.component.html',
  styleUrl: './liste-historique.component.css'
})
export class ListeHistoriqueComponent implements OnInit{
 // Propriétés pour stocker l'ID de l'abonnement et son nom
 id: string= '';
 SubscriptionName: string ='';

 dates: Date[] = [];

 constructor(
  private service: AbonnementsService,
  private route: ActivatedRoute,
  private title: Title, 
  private router : Router
) {}
  
  ngOnInit(): void {// Récupère les paramètres de l'URL
    this.route.queryParams.subscribe(params => {
    this.id = params['id'];this.SubscriptionName=params['nom']})
 
  // Définit le titre de la page en fonction du nom de l'abonnement
 this.title.setTitle(`${this.SubscriptionName} | Historique` );
 // Vérifie si un ID d'abonnement est disponible
 if (this.id) {this.getHistorique(this.id)

 }



}


 getHistorique(id:string): void {
  this.service.getHistorique(id).subscribe({
    next: (data) => {
      this.dates = data;
      this.dates = this.dates.reverse();
      console.log(this.dates)
    }
    ,
  
    error: (error) => {
      console.error('Erreur lors de la récupération de l\'historique', error);
    }
  });
}

navigateToVisualisation(date:string){ this.router.navigate([`/content/Visualisation/${date}`], { queryParams: { nom:this.SubscriptionName,id: this.id } });}

}
