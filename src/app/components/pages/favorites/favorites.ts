import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiFavorites } from '../../../services/api-favorites';
import { SectionHeading } from '../../apps/section-heading/section-heading';
import { IRecipe } from '../../modules/recipes-module';
import { Recipe } from '../recipes/recipe/recipe';

@Component({
  selector: 'app-favorites',
  imports: [Recipe, SectionHeading],
  templateUrl: './favorites.html',
  styleUrl: './favorites.scss',
})
export class Favorites implements OnInit {
  private readonly apiFavoritesService = inject(ApiFavorites);
  private readonly router = inject(Router);

  public favoriteRecipes = this.apiFavoritesService.favoriteRecipes;

  ngOnInit(): void {
    this.apiFavoritesService.getFavoriteItems().subscribe((res) => {
      this.apiFavoritesService.favoriteRecipes.set(res);
    });
  }

  /**
   * reviewRecipe
   * @param recipe IRecipe
   */
  public reviewRecipe(recipe: IRecipe): void {
    this.router.navigate(['recipes', 'review'], { state: recipe });
  }
}
