import { Component } from '@angular/core';
import { LobbyComponent } from '../game/lobby/lobby.component';
import { GameService } from '../game/game.service';

@Component({
  selector: 'app-serve',
  standalone: true,
  imports: [LobbyComponent],
  templateUrl: './serve.component.html',
  styleUrl: './serve.component.scss'
})
export class ServeComponent {
  constructor(private service: GameService) {
    //this.game
  }
}
