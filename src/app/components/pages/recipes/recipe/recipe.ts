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
   * Toggle favorite state and update the recipe
   */
  public toggleFavorite(): void {
    // If the favorite icon is not visible, do nothing
    if (!this.isFavoriteIconVisible()) return;

    const newFavoriteState = !this.isFavorite();
    this.apiFavoritesService
      .toggleFavorite(this.recipe(), newFavoriteState)
      .subscribe({
        next: () => {
          this.isFavorite.set(newFavoriteState);
          console.log(
            `Recipe ${newFavoriteState ? 'added to' : 'removed from'} favorites: ${this.recipe().name}`,
          );
        },
        error: (err) => {
          console.error('Error toggling favorite:', err);
        },
      });
  }
}
