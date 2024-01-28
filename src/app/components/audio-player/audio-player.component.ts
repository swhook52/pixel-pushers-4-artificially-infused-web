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
  _musicVolume: BehaviorSubject<number> = this.service.musicVolume;
  _sfxVolume: BehaviorSubject<number> = this.service.sfxVolume;
  open = false;

  constructor(private service: AudioService) {
    this.service.init();
  }

  formatLabel(value: number): string {
    return value.toString();
  }

  get musicVolume(): number {
    return this._musicVolume.getValue();
  }

  get sfxVolume(): number {
    return this._sfxVolume.getValue();
  }

  set musicVolume(eventOrValue: Event | number) {
    const value = eventOrValue instanceof Event ? parseInt((eventOrValue.target as HTMLInputElement).value) : eventOrValue;
    this.service.musicVolume = value;
  }

  set sfxVolume(eventOrValue: Event | number) {
    const value = eventOrValue instanceof Event ? parseInt((eventOrValue.target as HTMLInputElement).value) : eventOrValue;
    this.service.sfxVolume = value;
  }
}
