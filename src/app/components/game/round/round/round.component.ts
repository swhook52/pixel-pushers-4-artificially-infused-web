import { Component, Input, OnInit } from '@angular/core';
import { Game, Player } from '../../game.model';
import { GameService } from '../../game.service';
import { AudioService } from '../../../audio-player/audio.service';
import { CommonModule } from '@angular/common';
import {MatSelectChange, MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { Subject, catchError, count, take, takeUntil } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { createAvatar } from '@dicebear/core';
import { DomSanitizer } from '@angular/platform-browser';
import { bottts } from '@dicebear/collection';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-round',
  standalone: true,
  imports: [CommonModule, MatSelectModule, FormsModule, MatIconModule, MatProgressSpinner],
  templateUrl: './round.component.html',
  styleUrl: './round.component.scss'
})
export class RoundComponent implements OnInit {
  @Input() server: boolean = false;
  
  loading: boolean = false;
  game: Game = this.service.game.getValue();
  player: Player = this.service.player.getValue();
  templateParts: string[] = [];
  words: string[] = [];
  generatingImage: boolean = false;
  cachedSolutions: any = null;

  private onDestroy$ = new Subject<void>();
  
  constructor(private service: GameService, private audio: AudioService, private sanatizer: DomSanitizer) {}
  
  ngOnInit(): void {
    this.service.game.pipe(takeUntil(this.onDestroy$)).subscribe((game) => {
      this.game = game;
      this.player = game.players.find(p => p.id == this.player.id) || this.player;
      //this.addMockWorkds();
    });

    if (!this.game.round) return;

    const pattern = /({[^{}]+})/g;
    this.templateParts = this.game.round.template.split(pattern);

    if (!this.server && !this.player.id) this.player.id = localStorage.getItem('player') || '';
  }

  addMockWorkds() {
    this.player.nouns = ['Jerry', 'Tony', 'Sara'];
    this.player.verbs = ['ate', 'ran', 'jumped'];
    this.player.locations = ['the park', 'the store', 'the beach'];
    this.player.foods = ['pizza', 'burgers', 'ice cream'];
    this.player.adjectives = ['beautiful', 'ugly', 'fast'];
  }

  updateWord(index: number, $event: MatSelectChange) {
    this.words[index] = $event.value;
  }
    
  submitSolution() {
    const wordsUsed = this.words.filter(p => p);
    this.generatingImage = true;
    this.service.submitSolution(wordsUsed)
    .pipe(
      take(1),
      catchError(() => { 
        this.generatingImage = false;
        return [];
      }),
    )
    .subscribe(() => {
      this.generatingImage = false;
    });
  }

  getSvg(seed: string) {
    const svgString = createAvatar(bottts, {
      seed: seed,
    }).toString();
    return this.sanatizer.bypassSecurityTrustHtml(svgString);
  }

  getPlayer(id: string): Player | undefined{
    return this.game.players.find(p => p.id == id);
  }

  playerHasSubmitted(id: string = ''): boolean {
    if (!id) id = this.player.id;
    return this.game.round?.solutions.some(s => s.playerId == id) || false;
  }

  allPlayersHaveSubmitted(): boolean {
    return this.game.players.every(p => this.game.round?.solutions.some(s => s.playerId == p.id));
  }

  allImagesHaveBeenGenerated(): boolean {
    return this.game.round?.solutions.every(s => s.imageUrl) || false;
  }

  allPlayersHaveVoted(): boolean {
    let count = 0;
    this.game.round?.solutions.forEach(s => count += s.votes);
    if (count == this.game.players.length) this.cachedSolutions = this.game.round?.solutions;
    return count == this.game.players.length;
  }

  voteFor(id: string) {
    this.service.vote(id).pipe(take(1)).subscribe();
  }

  getPlayerScore(playerId: string): number {
    let score = 0;
    score += this.game.round?.solutions.find(s => s.playerId == playerId)?.votes || 0;
    score += this.game.players.find(p => p.id == playerId)?.score || 0;
    return score;
  }
    
}
