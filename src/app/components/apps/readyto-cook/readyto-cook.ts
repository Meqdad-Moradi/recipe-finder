import { Component, inject } from '@angular/core';
import { SectionTitle } from '../section-title/section-title';
import { Button } from '../button/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-readyto-cook',
  imports: [SectionTitle, Button],
  templateUrl: './readyto-cook.html',
  styleUrl: './readyto-cook.scss',
})
export class ReadytoCook {
  private readonly router = inject(Router);

  /**
   * browsRecipe
   */
  public browsRecipe(): void {
    this.router.navigate(['recipes']);
  }
}
