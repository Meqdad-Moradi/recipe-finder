import { Component, input, output, inject, model } from '@angular/core';
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
  private readonly apiFavoritesService = inject(ApiFavorites);

  readonly recipe = model.required<IRecipe>();
  readonly isFavoriteIconVisible = input<boolean>(false);

  readonly review = output<IRecipe>();

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

    const newFavoriteState = !this.recipe().isFavorite;
    this.apiFavoritesService
      .toggleFavorite(this.recipe(), newFavoriteState)
      .subscribe({
        next: () => {
          this.recipe.update((prev) => ({
            ...prev,
            isFavorite: newFavoriteState,
          }));
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
