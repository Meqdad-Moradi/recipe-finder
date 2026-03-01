import { computed, effect, Injectable, signal } from '@angular/core';
import { ThemeMode } from '../components/modules/theme.model';

@Injectable({
  providedIn: 'root',
})
export class Theme {
  private readonly storageKey = 'app-theme';

  // Detect system preference for dark mode
  private readonly systemPrefersDark = computed(() => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Check for stored theme in localStorage, if not found, use system preference
  private readonly storedTheme = computed<ThemeMode | null>(() => {
    return localStorage.getItem(this.storageKey) as ThemeMode | null;
  });

  // Initialize theme signal with stored theme or system preference or default to 'light'
  private readonly _theme = signal<ThemeMode>(
    this.storedTheme() !== null
      ? this.storedTheme()!
      : this.systemPrefersDark()
        ? 'dark'
        : 'light',
  );

  public readonly theme = computed<ThemeMode>(() => this._theme());

  constructor() {
    effect(() => {
      const current = this.theme();
      document.documentElement.setAttribute('data-theme', current);
      localStorage.setItem(this.storageKey, current);
    });
  }

  /**
   * setTheme
   * Set the theme mode to either 'light' or 'dark'.
   * @param mode ThemeMode
   */
  public setTheme(mode: ThemeMode): void {
    this._theme.set(mode);
  }

  /**
   * toggleTheme
   * Toggle the theme mode between 'light' and 'dark'.
   */
  public toggleTheme(): void {
    this._theme.update((current) => (current === 'light' ? 'dark' : 'light'));
  }
}
