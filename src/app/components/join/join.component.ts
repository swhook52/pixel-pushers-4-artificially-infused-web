import { Component } from '@angular/core';
import { GameService } from '../game/game.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { PlayerInfoComponent } from './player-info/player-info.component';

@Component({
  selector: 'app-join',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './join.component.html',
  styleUrl: './join.component.scss'
})
export class JoinComponent {
  gameId: string = '';
  name: string = '';
  avatarUrl: string = '';

  constructor(private game: GameService, private dialog: MatDialog ) { }

  setGameId(inputEvent: Event): void {
    if(!inputEvent.target) return;
    this.gameId = (<HTMLInputElement>inputEvent.target).value;
  }

  join(): void {
    const dialogRef = this.dialog.open(PlayerInfoComponent, {
      width: '250px'
    });
    this.game.join(this.gameId, this.name, this.avatarUrl);
  }
}
