import { Component, input, output, inject, signal } from '@angular/core';
import { IRecipe } from '../../../modules/recipes-module';
import { Button } from '../../../apps/button/button';
import { ApiFavorites } from '../../../../services/api-favorites';

@Component({
  selector: 'app-recipe',
  imports: [Button],
  templateUrl: './recipe.html',
  styleUrl: './recipe.scss',
})
export class Recipe {
  readonly recipe = input.required<IRecipe>();
  readonly isFavoriteIconVisible = input<boolean>(false);
  readonly review = output<IRecipe>();
  private readonly apiFavoritesService = inject(ApiFavorites);
  readonly isFavorite = signal(false);

  /**
   * reviewRecipe
   */
  public reviewRecipe(): void {
    this.review.emit(this.recipe());
  }

  /**
   * toggleFavorite
   * toggleFavorite - Add current recipe to favorites
   */
  public toggleFavorite(): void {
    // If the favorite icon is not visible, do nothing
    if (!this.isFavoriteIconVisible()) return;

    if (!this.isFavorite()) {
      this.apiFavoritesService.addItemToFavorites(this.recipe()).subscribe({
        next: () => {
          this.isFavorite.set(true);
          console.log('Recipe added to favorites:', this.recipe().name);
        },
        error: (err) => {
          console.error('Error adding recipe to favorites:', err);
        },
      });
    } else {
      this.apiFavoritesService
        .removeItemFromFavorites(this.recipe().id)
        .subscribe({
          next: () => {
            this.isFavorite.set(false);
            console.log('Recipe removed from favorites:', this.recipe().name);
          },
          error: (err) => {
            console.error('Error removing recipe from favorites:', err);
          },
        });
    }
  }
}
