import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
export const authorGuard: CanActivateFn = (route, state) => {
  const router =  inject(Router)
  

  if (typeof sessionStorage !== 'undefined') {
    const token = sessionStorage.getItem('accessToken');
    if (token) {  
      return true;
    }
  }


  router.navigate(['login']);


  return false;
};
