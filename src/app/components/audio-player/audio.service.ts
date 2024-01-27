import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private _musicPlyer?: HTMLAudioElement;
  private _sfxPlyer?: HTMLAudioElement;

  private _musicSrc$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private _sfxSrc$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() {
    this.init();
  }

  playMusic() {
    if (!this._musicPlyer) return;
    this._musicPlyer.pause();
    this._musicPlyer.src = this._musicSrc$.getValue();
    this._musicPlyer.load();
    this._musicPlyer.play();
  }

  playSfx() {
    if (!this._musicPlyer) return;
    this._musicPlyer.pause();
    this._musicPlyer.src = this._musicSrc$.getValue();
    this._musicPlyer.load();
    this._musicPlyer.play();
  }

  get musicSrc$(): BehaviorSubject<string> {
    return this._musicSrc$;
  }

  get sfxSrc$(): BehaviorSubject<string> {
    return this._sfxSrc$;
  }

  init() {
    this._musicPlyer = document.getElementById('music-player') as HTMLAudioElement || undefined;
    this._sfxPlyer = document.getElementById('sfx-player') as HTMLAudioElement || undefined;

    if (!this._musicPlyer || !this._sfxPlyer) {
      setTimeout(() => this.init(), 500);
    }
  }
}
