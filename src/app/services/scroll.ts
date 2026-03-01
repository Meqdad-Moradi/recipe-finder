import { ViewportScroller } from '@angular/common';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router, Scroll } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  private readonly router = inject(Router);
  private readonly viewportScroller = inject(ViewportScroller);

  public shouldScroll = signal<boolean>(false);

  // Convert router Scroll events to a signal
  private scrollEvent = toSignal(
    this.router.events.pipe(filter((e): e is Scroll => e instanceof Scroll)),
    { initialValue: null },
  );

  // Emits the pending Scroll event only when a router Scroll event occurs
  // *and* scrolling has been explicitly enabled via shouldScroll.
  private pendingScroll = computed(() => {
    const event = this.scrollEvent();
    const should = this.shouldScroll();
    return should && event ? event : null;
  });

  constructor() {
    effect(() => {
      const scrollEvent = this.pendingScroll();
      if (!scrollEvent) return;
      if (scrollEvent.position) {
        this.viewportScroller.scrollToPosition(scrollEvent.position);
      }
      this.shouldScroll.set(false);
    });
  }
}
