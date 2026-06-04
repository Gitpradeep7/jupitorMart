import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { NetworkService } from '../network.service';

export const authGuard: CanActivateFn = (route, state) => {
  const routee: Router = inject(Router);
  const protectedRoute: string [] = ['/home'];
  const network = inject(NetworkService)
  let data = localStorage.getItem('isLoggedIn');
  // return protectedRoute.includes(state.url) ? routee.navigate(['/']) : true;
 console.log('data ',data);
 if(!data){
  console.log('rrrr',route.url);
   routee.navigate(['login']);
  return false;
} 
return true;
};
