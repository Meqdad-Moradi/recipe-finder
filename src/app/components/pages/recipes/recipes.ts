import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ApiRecipes } from '../../../services/api-recipes';
import { CustomSearch } from '../../apps/custom-search/custom-search';
import { DropdownControl } from '../../apps/dropdown-control/dropdown-control';
import { SectionHeading } from '../../apps/section-heading/section-heading';
import { Loading } from '../../apps/loading/loading';
import { IRecipe } from '../../modules/recipes-module';
import { Recipe } from './recipe/recipe';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-recipes',
  imports: [DropdownControl, CustomSearch, Recipe, SectionHeading, Loading],
  templateUrl: './recipes.html',
  styleUrl: './recipes.scss',
})
export class Recipes implements OnInit {
  private readonly apiRecipesService = inject(ApiRecipes);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  private recipes = this.apiRecipesService.recipes;

  public filteredRecipes = signal<IRecipe[]>([]);
  public isLoading = signal<boolean>(false);
  public prepTimeOptions = ['Max prep time', 'Min prep time'];
  public cookTimeOptions = ['Max cook time', 'Min cook time'];

  public selectedPrep = signal<string>('');
  public selectedCook = signal<string>('');
  private searchQuery = '';

  ngOnInit(): void {
    this.getRecipes();
  }

  /**
   * getRecipes
   * fetches recipes from the API and updates the state accordingly
   */
  private getRecipes(): void {
    this.isLoading.set(true);
    this.apiRecipesService
      .getRecipes()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.isLoading.set(false);
        this.apiRecipesService.recipes.set(res);
        this.filteredRecipes.set(res);
      });
  }

  /**
   * reviewRecipe
   * @param recipe IRecipe
   */
  public reviewRecipe(recipe: IRecipe): void {
    this.router.navigate(['recipes', 'review'], { state: recipe });
  }

  /**
   * onSort
   */
  private onSort(option: string): void {
    const optionLower = option.toLowerCase();

    this.filteredRecipes.update((recipes) => {
      return [...recipes].sort((a, b) => {
        if (optionLower === 'max prep time') {
          return b.prepTimeMinutes - a.prepTimeMinutes;
        } else if (optionLower === 'min prep time') {
          return a.prepTimeMinutes - b.prepTimeMinutes;
        } else if (optionLower === 'max cook time') {
          return b.cookTimeMinutes - a.cookTimeMinutes;
        } else if (optionLower === 'min cook time') {
          return a.cookTimeMinutes - b.cookTimeMinutes;
        }
        return 0;
      });
    });
  }

  /**
   * onCookTimeSort
   * @param value string - cook selected query
   */
  public onCookTimeSort(value: string): void {
    this.onSort(value);
  }

  /**
   * onPrepSort
   * @param value string - prep selected query
   */
  public onPrepSort(value: string): void {
    this.onSort(value);
  }

  /**
   * onSearchFilter
   * @param value string - searchQuery
   */
  public onSearchFilter(value: string): void {
    this.searchQuery = value;
    const searchQueries = this.searchQuery.trim().split(' ');

    this.filteredRecipes.update(() => {
      return this.recipes().filter((recipe) => {
        const recipeName = recipe.name.toLowerCase();
        return searchQueries.every((query) =>
          recipeName.includes(query.toLowerCase()),
        );
      });
    });
  }
}
