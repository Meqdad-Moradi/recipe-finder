import { inject, Injectable, signal } from '@angular/core';
import { IRecipe } from '../components/modules/recipes-module';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiFavorites {
  private readonly baseUrl = 'http://localhost:3000/recipes';
  private readonly http = inject(HttpClient);

  public favoriteRecipes = signal<IRecipe[]>([]);

  /**
   * toggleFavorite
   * @param recipe IRecipe
   * @param isFavorite boolean
   * @returns Observable<IRecipe>
   */
  public toggleFavorite(
    recipe: IRecipe,
    isFavorite: boolean,
  ): Observable<IRecipe> {
    const updateData = { isFavorite };
    return this.http.patch<IRecipe>(`${this.baseUrl}/${recipe.id}`, updateData);
  }

  /**
   * getFavoriteItems
   * @returns Observable<IRecipe[]>
   */
  public getFavoriteItems(): Observable<IRecipe[]> {
    return this.http.get<IRecipe[]>(this.baseUrl + '?' + 'isFavorite=' + true);
  }
}
