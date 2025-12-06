import { Component, inject, OnInit } from '@angular/core';
import { ApiRecipes } from '../../../services/api-recipes';

@Component({
  selector: 'app-recipes',
  imports: [],
  templateUrl: './recipes.html',
  styleUrl: './recipes.scss',
})
export class Recipes implements OnInit {
  private apiRecipesService = inject(ApiRecipes);

  public recipes = this.apiRecipesService.recipes;

  ngOnInit(): void {
    this.apiRecipesService.getRecipes().subscribe((res) => {
      this.apiRecipesService.recipes.set(res);
      console.log(res)
    });
  }
}
