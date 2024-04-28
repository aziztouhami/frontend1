// Import les dépendances nécessaires 
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from './login/Services/token.service';
import { catchError, map, of } from 'rxjs';

export const authorGuard: CanActivateFn = (route, state) => {
  // Récupération de l'instance du service 'Router'
  const router =  inject(Router)
  const authService = inject(TokenService);

  return authService.verifyToken().pipe(
    map(isAuthenticated => {
      if (!isAuthenticated) {
        router.navigate(['/login']);
        return false;
      }
      return true;
    }),
    catchError(() => {
      router.navigate(['/login']);
      return of(false);
    })
  );
};
