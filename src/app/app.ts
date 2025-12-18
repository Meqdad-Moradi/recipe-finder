import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Scroll } from './services/scroll';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'recipe-finder';
  private scrollService = inject(Scroll);
}
