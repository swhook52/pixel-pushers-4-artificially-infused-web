import { Routes } from '@angular/router';
import { JoinComponent } from './components/join/join.component';
import { DeviceGuard } from './guards/device.guard';
import { CreateComponent } from './components/create/create.component';
import { GameComponent } from './components/game/game.component';
import { ServeComponent } from './components/serve/serve.component';

export const routes: Routes = [
    { path: '', canActivate: [DeviceGuard], component: GameComponent, pathMatch: 'full' },
    { path: 'join', component: JoinComponent, canActivate: [DeviceGuard], pathMatch: 'full' },
    { path: 'create', component: CreateComponent, canActivate: [DeviceGuard], pathMatch: 'full' },
    { path: 'serve/:id', component: ServeComponent, canActivate: [DeviceGuard], pathMatch: 'full' },
    { path: 'game/:id', component: GameComponent, canActivate: [DeviceGuard], pathMatch: 'full' },
    { path: '**', redirectTo: 'game', pathMatch: 'full' },
];
