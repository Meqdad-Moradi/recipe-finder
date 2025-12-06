import { Component, inject, OnInit } from '@angular/core';
import { ApiRecipes } from '../../../services/api-recipes';
import { SectionTitle } from '../../apps/section-title/section-title';
import { DropdownControl } from '../../apps/dropdown-control/dropdown-control';
import { CustomSearch } from "../../apps/custom-search/custom-search";
import { Recipe } from "./recipe/recipe";

@Component({
  selector: 'app-recipes',
  imports: [SectionTitle, DropdownControl, CustomSearch, Recipe],
  templateUrl: './recipes.html',
  styleUrl: './recipes.scss',
})
export class Recipes implements OnInit {
  private apiRecipesService = inject(ApiRecipes);

  public recipes = this.apiRecipesService.recipes;
  public prepTimeOptions = ['Max prep time', 'Min prep time'];
  public cookTimeOptions = ['Max cook time', 'Min cook time'];

  ngOnInit(): void {
    this.apiRecipesService.getRecipes().subscribe((res) => {
      this.apiRecipesService.recipes.set(res);
      console.log(res);
    });
  }
}
