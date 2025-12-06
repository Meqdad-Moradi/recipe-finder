import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { IRecipe } from '../components/modules/recipes-module';

@Injectable({
  providedIn: 'root',
})
export class ApiRecipes {
  private http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:3000/recipes';

  public recipes = signal<IRecipe[]>([]);

  public getRecipes(): Observable<IRecipe[]> {
    return this.http.get<IRecipe[]>(this.baseUrl);
  }
}
