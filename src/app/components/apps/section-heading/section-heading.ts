import { Component, input } from '@angular/core';
import { SectionTitle } from '../section-title/section-title';

@Component({
  selector: 'app-section-heading',
  imports: [SectionTitle],
  templateUrl: './section-heading.html',
  styleUrl: './section-heading.scss',
})
export class SectionHeading {
  readonly title = input.required<string>();
  readonly desc = input.required<string>();
}
