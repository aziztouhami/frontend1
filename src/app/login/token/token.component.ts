import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AuthentificationService } from '../Services/authentification.service';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { AuthenticationResult, EventMessage, EventType } from '@azure/msal-browser';
@Component({
  selector: 'app-process-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.css'],
})
export class TokenComponent implements OnInit {
  token: string | null = null;
  

  constructor(private router: Router,private activatedRoute: ActivatedRoute,private msalService: MsalService,private msalBroadcastService: MsalBroadcastService) {}


  ngOnInit() {
    /*this.activatedRoute.fragment.subscribe(fragment => {
      const params = new URLSearchParams(fragment ? fragment : '');
      this.code = params.get('code');
      console.log(this.code)
    });*/
   
    this.msalService.handleRedirectObservable().subscribe({
      next: (result: AuthenticationResult) => {      },
      error: (error) => console.error('Error processing redirect:', error)
    });

  
  }
}
