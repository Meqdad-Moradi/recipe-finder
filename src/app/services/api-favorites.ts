import { inject, Injectable, signal } from '@angular/core';
import { IRecipe } from '../components/modules/recipes-module';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiFavorites {
  private readonly baseUrl = 'http://localhost:3000/favorites';
  private readonly http = inject(HttpClient);

  public favoriteRecipes = signal<IRecipe[]>([]);

  /**
   * addItemToFavorites
   * @param item IRecipe
   * @returns Observable<IRecipe>
   */
  public addItemToFavorites(item: IRecipe): Observable<IRecipe> {
    const url = `${this.baseUrl}/${item}`;
    return this.http.post<IRecipe>(url, item);
  }

  /**
   *
   * @param itemId string
   * @returns Observable<IRecipe>
   */
  public removeItemFromFavorites(itemId: string): Observable<IRecipe> {
    const url = `${this.baseUrl}/${itemId}`;
    return this.http.delete<IRecipe>(url);
  }

  /**
   * getFavoriteItems
   * @returns Observable<IRecipe[]>
   */
  public getFavoriteItems(): Observable<IRecipe[]> {
    return this.http.get<IRecipe[]>(this.baseUrl);
  }
}
