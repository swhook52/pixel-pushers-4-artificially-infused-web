import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { AudioService } from './audio.service';
import { BehaviorSubject } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-audio-player',
  standalone: true,
  imports: [MatIconModule, MatSliderModule, AsyncPipe],
  templateUrl: './audio-player.component.html',
  styleUrl: './audio-player.component.scss'
})
export class AudioPlayerComponent {
  private _musicVolume: number = 50;
  private _sfxVolume: number = 50;

  musicSrc$: BehaviorSubject<string> = this.service.musicSrc$;
  sfxSrc$: BehaviorSubject<string> = this.service.sfxSrc$;

  constructor(private service: AudioService) {
    this.service.init();
  }

  formatLabel(value: number): string {
    return value.toString();
  }

  get musicVolume(): number {
    return this._musicVolume;
  }

  set musicVolume(eventOrValue: Event | number) {
    const value = eventOrValue instanceof Event ? parseInt((eventOrValue.target as HTMLInputElement).value) : eventOrValue;
    this._musicVolume = value;
  }

  get sfxVolume(): number {
    return this._sfxVolume;
  }

  set sfxVolume(eventOrValue: Event | number) {
    const value = eventOrValue instanceof Event ? parseInt((eventOrValue.target as HTMLInputElement).value) : eventOrValue;
    this._sfxVolume = value;
  }
}
