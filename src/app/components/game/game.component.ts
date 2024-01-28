import { Component } from '@angular/core';
import { LobbyComponent } from './lobby/lobby.component';
import { GameService } from './game.service';
import { Game } from './game.model';
import { RoundComponent } from './round/round/round.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [LobbyComponent, RoundComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  game: Game = {} as Game;

  constructor(private service: GameService) {
    this.service.game.subscribe((game) => {
      this.game = game;
    });
  }
}
