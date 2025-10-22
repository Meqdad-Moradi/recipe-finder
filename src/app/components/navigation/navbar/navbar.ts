import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  RouterLink,
  RouterLinkActive,
  RouterLinkWithHref,
} from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, RouterLinkWithHref, NgClass],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  constructor(private router: Router) {}

  isLinkActive(path: string): boolean {
    return this.router.isActive(path, path === '/');
  }
}
