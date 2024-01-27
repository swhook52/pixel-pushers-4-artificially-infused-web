import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'game';
  src = '';

  constructor() {
    fetch("https://morally-rich-beetle.ngrok-free.app/files/2024-01-27/de3feddb-83ac-43ed-842d-e4c2fee24f9f.png", {
      method: "get",
      headers: new Headers({
        "ngrok-skip-browser-warning": "69420",
      }),
    })
      .then((response) => response.blob())
      .then((blob) => this.src = URL.createObjectURL(blob))
      .catch((err) => console.log(err));
  }
}
