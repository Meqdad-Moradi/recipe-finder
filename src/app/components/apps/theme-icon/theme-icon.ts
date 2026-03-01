import { Component, computed, inject, signal } from '@angular/core';
import { Theme } from '../../../services/theme';

@Component({
  selector: 'app-theme-icon',
  imports: [],
  templateUrl: './theme-icon.html',
  styleUrl: './theme-icon.scss',
})
export class ThemeIcon {
  private readonly themeService = inject(Theme);

  public isDarkMode = computed(() => this.themeService.theme() === 'dark');

  /**
   * toggleDarkMode
   */
  public toggleDarkMode() {
    this.themeService.toggleTheme();
  }
}
