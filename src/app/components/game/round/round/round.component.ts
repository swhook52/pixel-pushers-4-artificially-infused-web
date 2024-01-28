import { Component, Input, OnInit } from '@angular/core';
import { Game, Player } from '../../game.model';
import { GameService } from '../../game.service';
import { AudioService } from '../../../audio-player/audio.service';
import { CommonModule } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-round',
  standalone: true,
  imports: [CommonModule, MatSelectModule, FormsModule],
  templateUrl: './round.component.html',
  styleUrl: './round.component.scss'
})
export class RoundComponent implements OnInit {
  @Input() server: boolean = false;
  game: Game = this.service.game.getValue();
  templateParts: any;
//  player: Player;
  
  constructor(private service: GameService, private audio: AudioService) {}
  
  ngOnInit(): void {
    // if (this.server) {
    //   this.player = this.game.players.find()
    // }
    var template = this.game.round.template;
    const pattern = /({[^{}]+})/g;
    this.templateParts = template.split(pattern);
  }


}
