import { Component, OnDestroy, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { Subject, takeUntil } from 'rxjs';
import { Game } from '../game.model';
import { AudioService } from '../../.././components/audio-player/audio.service';

@Component({
  selector: 'app-lobby',
  standalone: true,
  imports: [],
  templateUrl: './lobby.component.html',
  styleUrl: './lobby.component.scss'
})
export class LobbyComponent implements OnInit, OnDestroy {
  game: Game = this.service.game.getValue();

  private onDestroy$ = new Subject<void>();

  constructor(private service: GameService, private audio: AudioService) {}

  ngOnInit(): void {
    this.service.game.pipe(takeUntil(this.onDestroy$)).subscribe((game) => {
      this.game = game;
      this.audio.playLobbyMusic();
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
