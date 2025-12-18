import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ApiRecipes } from '../../../services/api-recipes';
import { CustomSearch } from '../../apps/custom-search/custom-search';
import { DropdownControl } from '../../apps/dropdown-control/dropdown-control';
import { SectionHeading } from '../../apps/section-heading/section-heading';
import { IRecipe } from '../../modules/recipes-module';
import { Recipe } from './recipe/recipe';

@Component({
  selector: 'app-recipes',
  imports: [DropdownControl, CustomSearch, Recipe, SectionHeading],
  templateUrl: './recipes.html',
  styleUrl: './recipes.scss',
})
export class Recipes implements OnInit {
  private apiRecipesService = inject(ApiRecipes);
  private readonly router = inject(Router);

  private recipes = this.apiRecipesService.recipes;

  public filteredRecipes = signal<IRecipe[]>([]);
  public prepTimeOptions = ['Max prep time', 'Min prep time'];
  public cookTimeOptions = ['Max cook time', 'Min cook time'];

  public selectedPrep = signal<string>('');
  public selectedCook = signal<string>('');

  private selectedPrepQuery = '';
  private selectedCookQuery = '';
  private searchQuery = '';

  ngOnInit(): void {
    this.apiRecipesService.getRecipes().subscribe((res) => {
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
   * onFilter
   */
  private onFilter(): void {
    const searchQueries = this.searchQuery.trim().split(' ');

    const filteredRecipes = this.recipes().filter((item) => {
      return searchQueries.every((x) =>
        item.name.toLocaleLowerCase().includes(x)
      );
    });

    this.filteredRecipes.set(filteredRecipes);
  }

  /**
   * onCookTimeFilter
   * @param value string - cook selected query
   */
  public onCookTimeFilter(value: string): void {
    this.selectedCookQuery = value;
    this.onFilter();
  }

  /**
   * onPrepFilter
   * @param value string - prep selected query
   */
  public onPrepFilter(value: string): void {
    this.selectedPrepQuery = value;
    this.onFilter();
  }

  /**
   * onSearchFilter
   * @param value string - searchQuery
   */
  public onSearchFilter(value: string): void {
    this.searchQuery = value;
    this.onFilter();
  }
}
