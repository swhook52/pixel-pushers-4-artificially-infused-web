import { Component } from '@angular/core';
import { GameService } from '../game/game.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { finalize, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {
  loading = false;

  constructor(private game: GameService, private router: Router) { }

  create(){
    this.loading = true;
    this.game.create().pipe(
        catchError(() => {
          this.loading = false;
          return [];
        }),
        finalize(() => this.loading = false)
      )
      .subscribe((game) => {
      this.router.navigate(['/serve', game.code]);
    });
  }
}
