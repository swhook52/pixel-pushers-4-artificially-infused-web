import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BehaviorSubject, switchMap, take } from 'rxjs';
import { Game } from './game.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private readonly apiBaseUrl = 'https://app-artifically-infused-api-dev.azurewebsites.net/game';
  private interval: number | null = null;
  private game$: BehaviorSubject<Game> = new BehaviorSubject<Game>({ code: "", players: [], rounds: [] });

  constructor(private router: Router, private http: HttpClient) {
    this.init();
  }

  get game(): BehaviorSubject<Game>{
    return this.game$;
  }

  create(): void{
    this.http.post(`${this.apiBaseUrl}/`, null).pipe(take(1)).subscribe((res) => {
      console.log(res);
      // this.id$.next(id);
      // this.router.navigate(['/serve', id]);
      // this.pollGameData();
    });
  }

  join(code: string, name: string, avatarUrl: string): void{
    const payload = {
      id: name,
      name: name,
      avatarUrl: avatarUrl,
      nouns: [],
      verbs: [],
      score: 0
    }
    this.http.post(`${this.apiBaseUrl}/${code}/player`, payload).pipe(take(1)).subscribe((res) => {
      console.log(res);
      // this.id$.next(id);
      // this.router.navigate(['/game', inputId]);
      // this.pollGameData();
    });
  }

  private pollGameData(): void{
    if (this.interval) window.clearInterval(this.interval);
    this.interval = window.setInterval(() => {
      const code = this.game$.getValue().code;
      this.http.get<Game>(`${this.apiBaseUrl}/${code}`).pipe(take(1)).subscribe((data) => {
        this.game$.next(data);
      });
    }, 10000);
  }

  private init() {
    const url = this.router.url;
    if (url.includes('serve/') || url.includes('game/')) {
      const id = url.split('/').pop();
      this.game$.next({ code: id || "", players: [], rounds: [] });
    }
  }
}
