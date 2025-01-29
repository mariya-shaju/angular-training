import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userId = localStorage.getItem('ID');

  if (userId) {
    return true;

  } else {
    console.log('Access denied! Redirecting to login...');
    router.navigate(['/login']);
    return false;
  }
};
