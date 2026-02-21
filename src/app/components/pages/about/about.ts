import { Component } from '@angular/core';
import { SectionTitle } from '../../apps/section-title/section-title';

@Component({
  selector: 'app-about',
  imports: [SectionTitle],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {}
