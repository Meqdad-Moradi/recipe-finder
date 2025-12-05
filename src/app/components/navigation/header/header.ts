import { Component } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-header',
  imports: [Navbar, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
