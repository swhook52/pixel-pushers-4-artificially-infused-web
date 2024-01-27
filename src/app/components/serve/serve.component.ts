import { Component } from '@angular/core';
import { GameService } from '../../game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-serve',
  standalone: true,
  imports: [],
  templateUrl: './serve.component.html',
  styleUrl: './serve.component.scss'
})
export class ServeComponent {
  id: string = this.game.id;
  constructor(private game: GameService, private router: Router) {
    if (!this.id) this.router.navigate(['/create']);
  }
}
