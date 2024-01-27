import { Component } from '@angular/core';
import { GameService } from '../../game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  id: string = this.game.id;
  constructor(private game: GameService, private router: Router) {
    if (!this.id) this.router.navigate(['/join']);
  }
}
