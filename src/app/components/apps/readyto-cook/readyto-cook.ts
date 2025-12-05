import { Component } from '@angular/core';
import { SectionTitle } from '../section-title/section-title';
import { Button } from '../button/button';

@Component({
  selector: 'app-readyto-cook',
  imports: [SectionTitle, Button],
  templateUrl: './readyto-cook.html',
  styleUrl: './readyto-cook.scss',
})
export class ReadytoCook {}
