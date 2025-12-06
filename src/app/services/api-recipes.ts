import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiRecipes {
  private http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:3000/recipes';

  public recipes = signal([]);

  public getRecipes(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }
}
