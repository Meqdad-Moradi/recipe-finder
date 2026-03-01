import { Component, inject } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { Router, RouterLink } from '@angular/router';
import { Button } from '../../apps/button/button';
import { ThemeIcon } from '../../apps/theme-icon/theme-icon';

@Component({
  selector: 'app-header',
  imports: [Navbar, RouterLink, Button, ThemeIcon],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private readonly router = inject(Router);

  public isMenuOpen = false;

  /**
   * Toggle the mobile menu when the hamburger icon is clicked.
   */
  public toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  /**
   * Navigate to the recipes page when the "Recipes" button is clicked.
   */
  public navigateToRecipes(): void {
    this.router.navigate(['/recipes']);
  }
}
