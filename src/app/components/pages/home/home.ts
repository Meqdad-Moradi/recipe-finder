import { Component } from '@angular/core';
import { Hero } from '../../apps/hero/hero';
import { FavoritServices } from "../../apps/favorit-services/favorit-services";
import { ShortInstruction } from "../../apps/short-instruction/short-instruction";

@Component({
  selector: 'app-home',
  imports: [Hero, FavoritServices, ShortInstruction],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
