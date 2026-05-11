import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const routee: Router = inject(Router);
  const protectedRoute: string [] = ['/home'];
 // return protectedRoute.includes(state.url) ? routee.navigate(['/']) : true;
 return true;
};
