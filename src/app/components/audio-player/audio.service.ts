import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private _musicPlyer?: HTMLAudioElement;
  private _sfxPlyer?: HTMLAudioElement;

  private _musicVolume$: BehaviorSubject<number> = new BehaviorSubject<number>(50);
  private _sfxVolume$: BehaviorSubject<number> = new BehaviorSubject<number>(50);

  constructor() {
    const savedMusicVolume = localStorage.getItem('musicVolume');
    const savedSfxVolume = localStorage.getItem('sfxVolume');
    if (savedMusicVolume) this._musicVolume$.next(parseInt(savedMusicVolume));
    if (savedSfxVolume) this._sfxVolume$.next(parseInt(savedSfxVolume));
  }

  playLobbyMusic() {
    this.playMusic('lobby.mp3');
  }

  playMainMenuMusic() {
    this.playMusic('mainMenu.mp3');
  }

  playPromptEntryMusic() {
    this.playMusic('playerPromptInput.mp3');
  }

  playNiceTastefulSophisticatedFart() {
    this.playMusic('tastefulFart.mp3');
  }

  playBubbleSelect() {
    this.playMusic('bubbleSelect.mp3');
  }

  playAirhorn() {
    this.playMusic('djAirhorn.mp3');
  }

  playNeedleDrop() {
    this.playMusic('djNeedleDrop.mp3');
  }

  playMultiPop() {
    this.playMusic('multiPop.mp3');
  }

  get musicVolume(): BehaviorSubject<number>{
    return this._musicVolume$;
  }

  get sfxVolume(): BehaviorSubject<number> {
    return this._sfxVolume$;
  }

  set musicVolume(volume: number) {
    this._musicVolume$.next(volume);
    localStorage.setItem('musicVolume', volume.toString());
  }

  set sfxVolume(volume: number) {
    this._sfxVolume$.next(volume);
    localStorage.setItem('sfxVolume', volume.toString());
  }

  private playMusic(filename: string) {
    if (!this._musicPlyer) return;
    this._musicPlyer.pause();
    this._musicPlyer.src = `../../../assets/audio/music/${filename}`;
    this._musicPlyer.load();
    this._musicPlyer.play();
  }

  private stopMusic() {
    this._musicPlyer?.pause;
  }

  // playSfx() {
  //   if (!this._musicPlyer) return;
  //   this._musicPlyer.pause();
  //   this._musicPlyer.src = this._musicSrc$.getValue();
  //   this._musicPlyer.load();
  //   this._musicPlyer.play();
  // }

  // get musicSrc$(): BehaviorSubject<string> {
  //   return this._musicSrc$;
  // }

  // get sfxSrc$(): BehaviorSubject<string> {
  //   return this._sfxSrc$;
  // }

  init() {
    this._musicPlyer = document.getElementById('music-player') as HTMLAudioElement || undefined;
    this._sfxPlyer = document.getElementById('sfx-player') as HTMLAudioElement || undefined;

    if (!this._musicPlyer || !this._sfxPlyer) {
      setTimeout(() => this.init(), 500);
      return;
    }

    this._musicVolume$.subscribe(volume => this._musicPlyer!.volume = volume/100);
    this._sfxVolume$.subscribe(volume => this._sfxPlyer!.volume = volume/100);
  }
}
