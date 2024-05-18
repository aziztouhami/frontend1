import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbonnementsService } from '../Services/abonnements.service';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';
import cytoscape from 'cytoscape';
import coseBilkent from 'cytoscape-cose-bilkent';
import { Observable, catchError, map, of } from 'rxjs';
// Interface pour structurer les données des groupes de ressources
interface ResourceGroup {
  name: string;
  location: string;
  resources: Resource[];
}
// Interface pour structurer les données des ressources
interface Resource {
  name: string;
  id: string;
  type:string;
  icon:string;
  dependsOn: ResourceConnection[];
  Resourcesconnecte: ResourceConnection[];
}
// Interface pour structurer les données de connexion entre les ressources
interface ResourceConnection {
  id: string;
}
@Component({
  selector: 'app-visualisation',
  templateUrl: './visualisation.component.html',
  styleUrl: './visualisation.component.css'
})
export class VisualisationComponent implements OnInit{

  // Propriétés pour stocker l'ID de l'abonnement et son nom
  id: string= '';
  SubscriptionName: string ='';
  
  date: string ='';
  error: boolean = false;
errorMessageacess: string = '';
isLoading = true; 


@ViewChild('cy', { static: true }) cyElement!: ElementRef;
constructor(
  private service: AbonnementsService,
  private route: ActivatedRoute,
  private title: Title
) {}

ngOnInit(): void { // Récupère les paramètres de l'URL
  this.route.params.subscribe(params => {
    
    this.date = params['date'];
  });
  this.route.queryParams.subscribe(queryParams => {
    this.id = queryParams['id'];
    this.SubscriptionName = queryParams['nom'];
  });
   // Définit le titre de la page en fonction du nom de l'abonnement
  this.title.setTitle(`${this.SubscriptionName} | Azure Resource Visualizer` );
  // Vérifie si un ID d'abonnement est disponible
  if (this.id) {
    // Récupère les données de l'abonnement correspondant à l'ID
    this.getHistorique(this.id,this.date).subscribe({
      next: (data) => {
         // Génère le diagramme à partir des données récupérées
        this.isLoading = false; 

        this.generateDiagram(data);
      // Si le chargement est terminé et aucune erreur, effectue un test  

      },
      error: (error) => {
        // En cas d'erreur lors de la récupération des données d'abonnement
        this.isLoading = false; 
        this.ErrorLoading()
        console.error('Erreur lors de la récupération des abonnements:', error);
        
      }
    });
  }
  else{      
      // Si aucun ID d'abonnement n'est disponible    
    this.isLoading = false; 

    this.ErrorLoading()}
  
}

getHistorique(id: string, date: string): Observable<ResourceGroup[]> {
  return this.service.getVisualisationChoisie(id, date).pipe(
    map(resourceGroups => {
      if (resourceGroups && Array.isArray(resourceGroups)) {
        return this.transformToResourceGroups(resourceGroups);
        // Transformation des données récupérées en structure de groupes de ressources
      } else {
        this.ErrorLoading();
        console.warn("La réponse du service n'est pas un tableau :", resourceGroups);
        return [];
      }
    }),
    catchError(error => {
      this.ErrorLoading();
      console.error('Une erreur est survenue :', error);
      return of([]); // Retourne un Observable d'un tableau vide en cas d'erreur
    })
  );
}
  


  // Méthode pour générer le diagramme à partir des données
  generateDiagram(array_rg: ResourceGroup[]): void {
    let x=0
    cytoscape.use(coseBilkent);
// Calcul du nombre total de ressources pour ajuster la taille des nœuds
    array_rg.forEach(rg=>{x=x+rg.resources.length})
      // Création du graphique cytoscape avec les données fournies
    const cy = cytoscape({
      container: this.cyElement.nativeElement,
      elements: this.convertDataToElements(array_rg),
      // Définition des propriétés de style des nœuds
      style:  [{
        // Style pour les nœuds normaux
        selector: 'node',
        style: {
          'shape': 'rectangle',
          'content': 'data(label)',
          'text-valign': 'bottom',
          'text-halign': 'center',
          'font-size': 30,
          'text-margin-y': 10,
          'background-color': '#ffffff',
          'background-image': (ele: any) =>`${environment.backendURL}/images/${ele.data('icon')}.PNG`,
          'background-fit': 'contain',
          'border-color': '#000',
          'border-width': 3,
          'width': this.calculateNodeSize(x), // Utilisation de la taille calculée
          'height': this.calculateNodeSize(x), // Utilisation de la taille calculée
        }
      },
      // Style pour les clusters (nœuds parents)
      {
        selector: '$node > node', // Sélecteur pour les nœuds parents
        style: {
          'background-color': '#ffffff', // Couleur de fond ajustée pour les clusters
          'shape': 'round-rectangle', // Forme ajustée
          'overlay-padding': 10, // Espacement autour des nœuds enfants
          'text-valign': 'top',
          'text-halign': 'center',
          "font-size":80,
          'border-color': '#777', 
          'border-width': 3,
          'width': 120, 
          'height': 120,  
          'background-image': (ele: any) =>`${environment.backendURL}/images/RESOURCEGROUPS.PNG`,
          'background-image-opacity':0.15,
          "background-image-smoothing":'yes',
        "background-opacity":0    }
      },
      // Style pour les edges
     
        {
          selector: '.dependsOn',
          style: {'curve-style': 'bezier',
          "arrow-scale":4,
            "target-arrow-shape":'triangle',
            "target-arrow-color":'black'
            
          }
          },
        {
          selector: '.clusters',
          style: {
            'target-arrow-shape': 'diamond',
            'target-arrow-color': 'red',
            'width': 2,
            'line-color': 'black',
            opacity:0,
          }
          }
        
          ],
          layout: {
             // Configuration du layout du graphique
            name: 'cose-bilkent',
            
            quality:'proof',
      nodeDimensionsIncludeLabels:true,
  nodeRepulsion: 8000000,
  idealEdgeLength: 800,
  edgeElasticity: 0.45,
  nestingFactor:9000000, 
  gravity: 500000000,
  numIter: 1000, 
  tile: true,
  animate: 'end',
  randomize: true
           
            
            
           
          }as any
    });
  }

  // Méthode pour convertir les données en éléments pour cytoscape
  convertDataToElements(data: ResourceGroup[]): any[] {
    let elements: any[] = [];
  
    data.forEach((cluster: ResourceGroup) => {
      elements.push({
        group: 'nodes',
        data: {
          id: `cluster-${cluster.name}`,
          label: ` ${cluster.name}`,
        }
      });
  
      cluster.resources.forEach((res: Resource) => {
        elements.push({
          group: 'nodes',
          data: {
            id: res.id,
            parent: `cluster-${cluster.name}`, 
            label: res.name,
            type: res.type,
            icon : res.icon
          }
        });
        
        res.dependsOn.forEach((dep: ResourceConnection) => {
          elements.push({
            group: 'edges',
            data: {
              id: `edge-depends-${res.id}-${dep.id}`,
              source: res.id,
              target: dep.id
            },classes:'dependsOn'
          });
        });
  
        res.Resourcesconnecte.forEach((conn: ResourceConnection) => {
          elements.push({
            group: 'edges',
            data: {
              id: `edge-connected-${res.id}-${conn.id}`,
              source: res.id,
              target: conn.id
            }
          });
        });
      });
    });

    for (let i = 0; i < data.length; i++) {
      for (let j = i + 1; j < data.length; j++) {
        elements.push({
          group: 'edges',
          data: {
            // L'identifiant est construit en combinant les noms des clusters
            id: `virtual-edge-${data[i].name}-${data[j].name}`,
            source: `cluster-${data[i].name}`,
            target: `cluster-${data[j].name}`,
            // Ces données pourraient être utilisées pour styliser différemment les arêtes virtuelles
            virtual: true
          },classes:'clusters'
        });
      }
    }
  
    return elements;
  }





  private transformToResourceGroups(data: any[]): ResourceGroup[] {
    // Transformation des données en structure de groupes de ressources
  return data.map((rg: any) => ({
    name: rg.name,
    location: rg.location,
    resources: rg.resources.map((res: any) => ({
      id: res.id,
      name: res.name,
      type : res.type,
      icon: res.icon,
      dependsOn: res.dependsOn.map((depId: any) => ({ id: depId })),
      Resourcesconnecte: res.Resourcesconnecte.map((connId: any) => ({ id: connId })),
    }))
  }));
}

// Méthode pour calculer la taille des nœuds en fonction du nombre total de ressources
private calculateNodeSize(totalNodes: number): number {
  // Logique de calcul de la taille des nœuds
  // Cette fonction peut être ajustée selon vos besoins spécifiques
  const minSize = 60; // Taille minimale des nœuds
  const maxSize = 120; // Taille maximale des nœuds
  const scaleFactor = 0.5; // Facteur d'échelle pour réduire la taille en fonction du nombre de nœuds
  // Calculez une taille de base en utilisant une formule ou une table de correspondance selon votre besoin
  let size = maxSize - (totalNodes * scaleFactor);
  // Assurez-vous que la taille est dans les limites min et max
  size = Math.max(minSize, size);
  size = Math.min(maxSize, size);

  return size;
}



ErrorLoading() {
  this.error = true;
  this.errorMessageacess = 'Error while loading the graphic';

}

}
