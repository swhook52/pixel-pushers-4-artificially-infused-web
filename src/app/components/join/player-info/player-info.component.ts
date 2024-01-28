import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { adventurer, lorelei } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';

export interface Player {
  name: string;
  avatarSvg: string;
}
@Component({
  selector: 'app-player-info',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './player-info.component.html',
  styleUrl: './player-info.component.scss'
})
export class PlayerInfoComponent implements OnInit{
  player: Player = {
    name: '',
    avatarSvg: ''
  };
  svg: SafeHtml = '';
  constructor(public dialogRef: MatDialogRef<PlayerInfoComponent>, private sanitizer: DomSanitizer, private snackbar: MatSnackBar) {}

  ngOnInit(): void {
    this.generateAvatar();
  }

  generateAvatar(): void {
    const svg = this.player.avatarSvg = createAvatar(adventurer, {
      seed: this.player.name + Math.random(),
    }).toString();
    this.svg = this.sanitizer.bypassSecurityTrustHtml(svg);
    this.player.avatarSvg = svg;
  }

  close(): void {
    if(!this.player.name){
      this.snackbar.open('Please enter a name', 'Close', { duration: 7000 });
      return;
    }
    this.dialogRef.close(this.player);
  }
}
