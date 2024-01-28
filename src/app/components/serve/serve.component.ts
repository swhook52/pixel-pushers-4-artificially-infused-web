import { Round } from './../game/game.model';
import { Component, OnInit } from '@angular/core';
import { LobbyComponent } from '../game/lobby/lobby.component';
import { GameService } from '../game/game.service';
import { Game } from '../game/game.model';
import { RoundComponent } from '../game/round/round/round.component';

@Component({
  selector: 'app-serve',
  standalone: true,
  imports: [LobbyComponent, RoundComponent],
  templateUrl: './serve.component.html',
  styleUrl: './serve.component.scss'
})
export class ServeComponent implements OnInit{
  game: Game = this.service.game.getValue();
  init = false;
  constructor(private service: GameService) {}

  ngOnInit(): void {
    this.service.game.subscribe((game) => {
      this.game = game;
      this.init = true;
    });
  }
}
