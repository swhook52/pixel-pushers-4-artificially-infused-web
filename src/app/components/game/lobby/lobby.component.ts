import { Component, OnDestroy, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { Subject, takeUntil } from 'rxjs';
import { Game } from '../game.model';

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

  constructor(private service: GameService) {}

  ngOnInit(): void {
    this.service.game.pipe(takeUntil(this.onDestroy$)).subscribe((game) => {
      this.game = game;
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}