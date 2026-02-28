import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { IGuest } from '../components/modules/guests-module';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiGuests {
  private http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:3000/guests';

  /**
   * Get all guests from the database
   */
  public getGuests(): Observable<IGuest[]> {
    return this.http.get<IGuest[]>(this.baseUrl);
  }

  /**
   * Add a new guest to the database
   */
  public addGuest(guest: Omit<IGuest, 'id'>): Observable<IGuest> {
    return this.http.post<IGuest>(this.baseUrl, guest);
  }

  /**
   * Remove a guest from the database
   */
  public removeGuest(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  /**
   * Update a guest in the database
   */
  public updateGuest(guest: IGuest): Observable<IGuest> {
    return this.http.patch<IGuest>(`${this.baseUrl}/${guest.id}`, guest);
  }
}
