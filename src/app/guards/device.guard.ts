import { GameService } from '../components/game/game.service';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Game } from '../components/game/game.model';

export const DeviceGuard: CanActivateFn = (route, state) => {

  return true;

  const router = inject(Router);
  const service = inject(GameService);
  
  const isMobile: boolean = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const game: Game = service.game.getValue();

  if (isMobile && game.code && !state.url.includes('game')) {
    router.navigate([`/game/${game.code}`]);
    return false;
  }

  if (isMobile && !game.code && !state.url.includes('join')) {
    router.navigate(['/join']);
    return false;
  }

  if (!isMobile && game.code && !state.url.includes('serve')) {
    router.navigate([`/serve/${game.code}`]);
    return false;
  }

  if (!isMobile && !game.code && !state.url.includes('create')) {
    router.navigate(['/create']);
    return false;
  }

  return true;
};
