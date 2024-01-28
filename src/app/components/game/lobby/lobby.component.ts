import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { Subject, catchError, take, takeUntil, distinctUntilChanged } from 'rxjs';
import { Game } from '../game.model';
import { DomSanitizer } from '@angular/platform-browser';
import { AudioService } from '../../.././components/audio-player/audio.service';
import { createAvatar } from '@dicebear/core';
import { bottts } from '@dicebear/collection';

@Component({
  selector: 'app-lobby',
  standalone: true,
  imports: [],
  templateUrl: './lobby.component.html',
  styleUrl: './lobby.component.scss'
})
export class LobbyComponent implements OnInit, OnDestroy {
  @Input() server: boolean = false;
  loading: boolean = false;
  game: Game = this.service.game.getValue();

  private onDestroy$ = new Subject<void>();

  constructor(private service: GameService, private sanatizer: DomSanitizer, private audio: AudioService) {}

  ngOnInit(): void {
    this.audio.playLobbyMusic();
    this.service.game.pipe(distinctUntilChanged(), takeUntil(this.onDestroy$)).subscribe((game) => {
      this.game = game;
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  getSvg(seed: string) {
    const svgString = createAvatar(bottts, {
      seed: seed,
    }).toString();
    return this.sanatizer.bypassSecurityTrustHtml(svgString);
  }

  startGame(): void {
    this.loading = true;
    this.service.startGame()
    .pipe(
      take(1),
      catchError(() => { 
        this.loading = false;
        return [];
      }),
    )
    .subscribe();
  }
}
