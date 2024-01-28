import { Component } from '@angular/core';
import { GameService } from '../game/game.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { PlayerInfoComponent } from './player-info/player-info.component';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { catchError, finalize, take } from 'rxjs';
import { Router } from '@angular/router';

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
  root = document.querySelector('app-root') as HTMLElement;

  constructor(private game: GameService, private dialog: MatDialog, private router: Router ) { }

  setGameId(inputEvent: Event): void {
    if(!inputEvent.target) return;
    this.gameId = (<HTMLInputElement>inputEvent.target).value;
  }

  join(): void {
    this.loading = true;
    this.root.classList.add('blur');
    const dialog = this.dialog.open(PlayerInfoComponent, {
      width: '400px'
    });

    dialog.afterClosed().pipe(
        take(1),
        finalize(() => {
          this.loading = false;
          this.root.classList.remove('blur');
        })
      )
      .subscribe((result) => {
        console.log(result);
        if(!result) return;
        this.game.join(this.gameId, result.name, result.avatarSvg).pipe(take(1)).subscribe((players) => {
          this.router.navigate([`/game/${this.gameId}`]);
        });
      });
  }
}
