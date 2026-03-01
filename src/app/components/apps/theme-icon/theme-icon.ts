import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-theme-icon',
  imports: [],
  templateUrl: './theme-icon.html',
  styleUrl: './theme-icon.scss',
})
export class ThemeIcon {
  isDarkMode = signal(false);

  toggleDarkMode() {
    this.isDarkMode.update((prev) => !prev);
    document.documentElement.classList.toggle('dark');
  }
}
