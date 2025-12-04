import { Component } from '@angular/core';
import { Hero } from '../../apps/hero/hero';
import { FavoritServices } from "../../apps/favorit-services/favorit-services";

@Component({
  selector: 'app-home',
  imports: [Hero, FavoritServices],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
