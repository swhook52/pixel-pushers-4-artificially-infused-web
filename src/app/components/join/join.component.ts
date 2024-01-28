import { Component } from '@angular/core';
import { GameService } from '../game/game.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { PlayerInfoComponent } from './player-info/player-info.component';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-join',
  standalone: true,
  imports: [MatDialogModule, MatProgressSpinner],
  templateUrl: './join.component.html',
  styleUrl: './join.component.scss'
})
export class JoinComponent {
  gameId: string = '';
  name: string = '';
  avatarUrl: string = '';
  loading = false;

  constructor(private game: GameService, private dialog: MatDialog ) { }

  setGameId(inputEvent: Event): void {
    if(!inputEvent.target) return;
    this.gameId = (<HTMLInputElement>inputEvent.target).value;
  }

  join(): void {
    this.loading = true;
    const dialog = this.dialog.open(PlayerInfoComponent, {
      width: '400px'
    });

    dialog.afterClosed().subscribe(result => {
      if(!result){
        this.loading = false;
        return;
      }
      this.game.join(this.gameId, result.name, result.avatarSvg);
    });
  }
}
