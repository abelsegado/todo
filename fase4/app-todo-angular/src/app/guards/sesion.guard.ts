import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SesionService } from '../services/sesion.service';

export const sesionGuard: CanActivateFn = (route, state) => {
  if (inject(SesionService).sesionIniciada()) {
    return true;
  }
  inject(Router).navigate(['/login']);
  return false;
};
