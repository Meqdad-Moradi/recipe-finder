import { AfterViewInit, Directive, inject } from '@angular/core';
import { ScrollService } from '../services/scroll';

@Directive({
  selector: '[appRestoreScrolling]',
})
export class RestoreScrolling implements AfterViewInit {
  private readonly scrollService = inject(ScrollService);

  ngAfterViewInit(): void {
    const observer = new ResizeObserver(() => {
      this.scrollService.shouldScroll.set(true);
    });

    observer.observe(document.body);
  }
}
