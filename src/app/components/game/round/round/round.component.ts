import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Game, Player } from '../../game.model';
import { GameService } from '../../game.service';
import { AudioService } from '../../../audio-player/audio.service';
import { CommonModule } from '@angular/common';
import {MatSelectChange, MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { Subject, catchError, count, distinctUntilChanged, take, takeUntil } from 'rxjs';
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
  alreadyVoted: boolean = false;
  carouselCount: number = 0
  carouselInterval: any;

  private onDestroy$ = new Subject<void>();

  constructor(private service: GameService, private audio: AudioService, private sanatizer: DomSanitizer) {}
  
  ngOnInit(): void {
    console.log('currently set to ' + this.alreadyVoted);
    console.log('resetting vote');
    this.alreadyVoted = false;
    this.cachedSolutions = null;

    this.initCarousel();

    this.service.game
    .pipe(
      distinctUntilChanged(),
      takeUntil(this.onDestroy$)
    ).subscribe((game) => {
      console.log('game', game);
      if (JSON.stringify(this.game) !== JSON.stringify(game) ) this.game = game;
      this.player = game.players.find(p => p.id == this.player.id) || this.player;
      if (!this.game.round) return;  
      const pattern = /({[^{}]+})/g;
      this.templateParts = this.game.round.template.split(pattern);
    });

    if (!this.server && !this.player.id) this.player.id = localStorage.getItem('player') || '';
  }

  initCarousel() {
    const solutionsExist = document.querySelectorAll('.solution').length > 0;
    if (!solutionsExist) {
      setTimeout(() => {
        this.initCarousel();
      }, 1000);
      return;
    }
    this.carouselCount = 0;
    this.carouselNext();
    if (this.carouselInterval) clearInterval(this.carouselInterval);
    this.carouselInterval = setInterval(() => {
      this.carouselNext();
    }, 12500);
  }

  carouselNext() {
      const total = document.querySelectorAll('.solution').length;
      const active = document.querySelector('.solution.active');
      console.log(active);
      if (!active || this.carouselCount >= total){
        this.carouselCount = 0;
        document.querySelectorAll('.solution')[0]?.classList.add('active');
        this.carouselCount++;
        return;
      }
      console.log(this.carouselCount);
      active.classList.remove('active');
      const next = document.querySelectorAll('.solution')[this.carouselCount];
      next?.classList.add('active');
      this.carouselCount++;
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

    var allHaveVoted = count == this.game.players.length;

    if (allHaveVoted) {
      this.alreadyVoted = false;
      if (!this.server) {
        this.cachedSolutions = null;
      }
    }

    return allHaveVoted;
  }

  voteFor(playerId: string) {
    if (this.alreadyVoted || playerId === this.player.id)
    {
      return;
    }
    this.alreadyVoted = true;
    this.service.vote(playerId).pipe(take(1)).subscribe();
  }

  getPlayerScore(playerId: string): number {
    let score = 0;
    score += this.game.round?.solutions.find(s => s.playerId == playerId)?.votes || 0;
    score += this.game.players.find(p => p.id == playerId)?.score || 0;
    return score;
  }

  endRound() {
    console.log('calling end round');
    this.service.endRound().pipe(take(1)).subscribe(p => {
      console.log('round end. resetting vote');
      this.game = {} as Game;
      this.alreadyVoted = false;
      this.cachedSolutions = null;
    });
  }
    
}
