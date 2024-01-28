import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, take, tap } from 'rxjs';
import { Game, Round } from './game.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private readonly apiBaseUrl = 'https://app-artifically-infused-api-dev.azurewebsites.net/game';
  private interval: number | null = null;
  private game$: BehaviorSubject<Game> = new BehaviorSubject<Game>({ code: "", players: [], round: {} as Round });

  constructor(private router: Router, private http: HttpClient, private snackbar: MatSnackBar) {
    this.init();
  }

  get game(): BehaviorSubject<Game>{
    return this.game$;
  }

  create(): Observable<Game>{
    return this.http.post<Game>(`${this.apiBaseUrl}/`, null)
    .pipe(
      take(1),
      catchError(() => {
        this.snackbar.open('Failed to create game', 'Close', { duration: 7000 });
        return [];
      }),
      tap((game) => {
          this.game$.next(game);
          this.pollGameData();
      })
    );
  }

  join(code: string, name: string, avatarUrl: string): Observable<[]>{
    const payload = {
      id: name,
      name: name,
      avatarUrl: avatarUrl,
      nouns: [],
      verbs: [],
      score: 0
    }
    return this.http.post<[]>(`${this.apiBaseUrl}/${code}/player`, payload)
    .pipe(
      take(1),
      catchError(() => {
        this.snackbar.open('Game not found', 'Close', { duration: 7000 });
        return [];
      }),
      tap(() => {
        this.pollGameData();
      })
    );
  }

  startGame() {
    
  }

  private pollGameData(): void{
    if (this.interval) window.clearInterval(this.interval);
    this.interval = window.setInterval(() => {
      console.log('polling...');
      const code = this.game$.getValue().code;
      if (!code) return;
      this.http.get<Game>(`${this.apiBaseUrl}/${code}`).pipe(take(1)).subscribe((data) => {
        console.log(data);
        this.game$.next(data);
      });
    }, 2000);
  }

  private init() {
    const url = this.router.url;
    if (url.includes('serve/') || url.includes('game/')) {
      const id = url.split('/').pop();
      if (!id) return;
      this.game$.next({ code: id || "", players: [], round: {} as Round});
      this.pollGameData();
    }
  }
}
