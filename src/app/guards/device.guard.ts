import { GameService } from './../game.service';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const DeviceGuard: CanActivateFn = (route, state) => {

  return true;

  const router = inject(Router);
  const game = inject(GameService);
  
  const isMobile: boolean = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  if (isMobile && game.id && !state.url.includes('game')) {
    router.navigate([`/game/${game.id}`]);
    return false;
  }

  if (isMobile && !game.id && !state.url.includes('join')) {
    router.navigate(['/join']);
    return false;
  }

  if (!isMobile && game.id && !state.url.includes('serve')) {
    router.navigate([`/serve/${game.id}`]);
    return false;
  }

  if (!isMobile && !game.id && !state.url.includes('create')) {
    router.navigate(['/create']);
    return false;
  }

  return true;
};
