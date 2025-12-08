import { Component, input, output } from '@angular/core';
import { IRecipe } from '../../../modules/recipes-module';
import { Button } from '../../../apps/button/button';

@Component({
  selector: 'app-recipe',
  imports: [Button],
  templateUrl: './recipe.html',
  styleUrl: './recipe.scss',
})
export class Recipe {
  readonly recipe = input.required<IRecipe>();
  readonly review = output<IRecipe>();

  /**
   * reviewRecipe
   */
  public reviewRecipe(): void {
    this.review.emit(this.recipe());
  }
}
