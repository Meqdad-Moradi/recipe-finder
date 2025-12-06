import { Component, inject, OnInit } from '@angular/core';
import { ApiRecipes } from '../../../services/api-recipes';
import { SectionTitle } from "../../apps/section-title/section-title";

@Component({
  selector: 'app-recipes',
  imports: [SectionTitle],
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
