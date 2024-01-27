import { Injectable } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BehaviorSubject, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  _id: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private router: Router) {
    this.init();
  }

  create(): void{
    const id = this.generateGameId();
    this._id.next(id);
    this.router.navigate(['/serve', id]);
  }

  join(inputId: string): void{
    // check if game exists?
    this._id.next(inputId);
    this.router.navigate(['/game', inputId]);
  }

  get id(): string{
    return this._id.getValue();
  }

  private generateGameId() {
    const chars = 'ABCDEFGHJKMNPQRTUVWXYZ3456789';
    let rand = '';
  
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      rand += chars.charAt(randomIndex);
    }
  
    return rand;
  }

  private init() {
    const url = this.router.url;
    if (url.includes('serve/') || url.includes('game/')) {
      const id = url.split('/').pop();
      this._id.next(id || '');
    }
  }
}
