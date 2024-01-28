import { Component, Input, OnInit } from '@angular/core';
import { Game, Player } from '../../game.model';
import { GameService } from '../../game.service';
import { AudioService } from '../../../audio-player/audio.service';
import { CommonModule } from '@angular/common';
import {MatSelectChange, MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { Subject, catchError, take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-round',
  standalone: true,
  imports: [CommonModule, MatSelectModule, FormsModule],
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

  private onDestroy$ = new Subject<void>();
  
  constructor(private service: GameService, private audio: AudioService) {}
  
  ngOnInit(): void {
    this.service.game.pipe(takeUntil(this.onDestroy$)).subscribe((game) => {
      this.game = game;
    });

    this.service.player.pipe(takeUntil(this.onDestroy$)).subscribe((player) => {
      this.player = player;
      //this.player.nouns = [ "cat", "dog", "snake" ];
    });

    const pattern = /({[^{}]+})/g;
    this.templateParts = this.game.round.template.split(pattern);
  }

  updateWord(index: number, $event: MatSelectChange) {
    this.words[index] = $event.value;
  }
    
  submitSolution() {
    const wordsUsed = this.words.filter(p => p);

    this.loading = true;
    this.service.submitSolution(wordsUsed)
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
