import { Component } from '@angular/core';
import { GameService } from '../game/game.service';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {

  constructor(private game: GameService) { }

  create(){
    this.game.create();
  }
}
