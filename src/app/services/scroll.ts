import { Injectable, signal, inject } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class Scroll {
  // Signal to hold scroll positions keyed by URL
  private positions = signal<Map<string, number>>(new Map());

  private router = inject(Router);

  constructor() {
    // Track scroll events and update signal
    fromEvent(window, 'scroll').subscribe(() => {
      const currentUrl = this.router.url;
      const position = window.scrollY;
      const map = new Map(this.positions());
      map.set(currentUrl, position);
      this.positions.set(map);
    });

    // Listen for navigation events
    this.router.events
      .pipe(filter((e) => e instanceof NavigationStart))
      .subscribe((e: NavigationStart) => {
        // Save current scroll position before navigating away
        const currentUrl = this.router.url;
        const map = new Map(this.positions());
        map.set(currentUrl, window.scrollY);
        this.positions.set(map);
      });

    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => {
        // Restore scroll position after navigation
        this.restoreScroll(e.urlAfterRedirects);
      });
  }

  private restoreScroll(url: string): void {
    const position = this.positions().get(url);
    setTimeout(() => {
      window.scrollTo({
        top: position ?? 0,
        behavior: 'smooth',
      });
    }, 0);
  }
}
