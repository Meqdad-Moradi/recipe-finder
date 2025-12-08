import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IRecipe } from '../../../modules/recipes-module';
import { Router } from '@angular/router';
import { Button } from '../../../apps/button/button';

@Component({
  selector: 'app-recipe-review',
  imports: [CommonModule, FormsModule, Button],
  templateUrl: './recipe-review.html',
  styleUrl: './recipe-review.scss',
})
export class RecipeReview {
  private readonly router = inject(Router);
  public recipe!: IRecipe;

  rating = signal<number>(0);
  review = signal<string>('');
  hoveredRating = signal<number>(0);

  constructor() {
    const nav = this.router.currentNavigation()?.extras?.state as IRecipe;

    if (nav) {
      this.recipe = nav;
    }
  }

  /**
   * setRating
   * @param value number
   */
  public setRating(value: number): void {
    this.rating.set(value);
  }

  /**
   * setHoveredRating
   * @param value number
   */
  public setHoveredRating(value: number): void {
    this.hoveredRating.set(value);
  }

  /**
   * onReviewChange
   * @param event Event
   */
  public onReviewChange(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.review.set(target.value);
  }

  /**
   * submitReview
   */
  public submitReview(): void {
    if (this.rating() > 0 && this.review().trim()) {
      console.log({
        recipe: this.recipe.name,
        rating: this.rating(),
        review: this.review(),
        recipeId: this.recipe.id,
      });
      this.review.set('');
      this.rating.set(0);
      alert('Review submitted successfully!');
    }
  }

  /**
   * goToRecipes
   */
  public goToRecipes(): void {
    this.router.navigate(['recipes']);
  }
}
