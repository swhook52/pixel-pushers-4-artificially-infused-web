import { Component } from '@angular/core';
import { LobbyComponent } from '../game/lobby/lobby.component';

@Component({
  selector: 'app-serve',
  standalone: true,
  imports: [LobbyComponent],
  templateUrl: './serve.component.html',
  styleUrl: './serve.component.scss'
})
export class ServeComponent {
  constructor() {
  }
}
