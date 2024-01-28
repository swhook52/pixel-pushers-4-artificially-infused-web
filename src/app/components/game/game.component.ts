import { Component } from '@angular/core';
import { LobbyComponent } from './lobby/lobby.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [LobbyComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {

  constructor() {}
}
