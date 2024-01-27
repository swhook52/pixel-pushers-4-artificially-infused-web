import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-join',
  standalone: true,
  imports: [],
  templateUrl: './join.component.html',
  styleUrl: './join.component.scss'
})
export class JoinComponent {
  gameId: string = '';

  constructor(private router: Router) { }

  setGameId(inputEvent: Event): void {
    if(!inputEvent.target) return;
    this.gameId = (<HTMLInputElement>inputEvent.target).value;
  }

  join(): void {
    this.router.navigate([`/game/${this.gameId}`]);
  }
}
