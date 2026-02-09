import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  HostListener,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { ApiGuests } from '../../../services/api-guests';
import { FilterSort } from '../../apps/filter-sort/filter-sort';
import { SectionHeading } from '../../apps/section-heading/section-heading';
import { IGuest } from '../../modules/guests-module';
import { AddGuestForm } from './add-guest-form/add-guest-form';
import { Guest } from './guest/guest';

@Component({
  selector: 'app-guests',
  imports: [
    CommonModule,
    SectionHeading,
    Guest,
    AddGuestForm,
    FilterSort,
  ],
  templateUrl: './guests.html',
  styleUrl: './guests.scss',
})
export class Guests implements OnInit {
  private readonly guestApiService = inject(ApiGuests);

  public guests = this.guestApiService.guests;
  public openMenuId = signal<number | null>(null);
  public editingGuest = signal<IGuest | null>(null);

  ngOnInit(): void {
    this.loadGuests();
  }

  /**
   * loadGuests
   * Load all guests from the backend
   */
  private loadGuests(): void {
    this.guestApiService.getGuests().subscribe({
      next: (guests) => {
        this.guests.set(guests.reverse());
      },
      error: (error) => {
        console.error('Error loading guests:', error);
      },
    });
  }

  /**
   * getGrandTotal
   * Calculate grand total price from present guests only
   */
  public getGrandTotal = computed(() => {
    return this.guests()
      .filter((g) => g.isPresent)
      .reduce((total, guest) => {
        return total + guest.guestCount * guest.foodPrice;
      }, 0);
  });

  /**
   * getPresentGuestCount
   * Get count of present guests
   */
  public getPresentGuestCount(): number {
    return this.guests()
      .filter((g) => g.isPresent)
      .reduce((total, guest) => {
        return total + guest.guestCount;
      }, 0);
  }

  /**
   * allGuests
   * Calculate total number of guests (present and not present)
   */
  public allGuests = computed(() => {
    return this.guests().reduce((total, guest) => total + guest.guestCount, 0);
  });

  /**
   * addGuest
   * Add guest to the backend
   */
  public addGuest(formValue: IGuest): void {
    const isGeustExist = this.guests().some(
      (g) => g.name.toLowerCase() === formValue.name.toLowerCase(),
    );

    if (isGeustExist) {
      alert('Guest with this name already exists!');
      return;
    }

    const newGuest: Omit<IGuest, 'id'> = {
      name: formValue.name,
      guestCount: Number(formValue.guestCount),
      foodPrice: Number(formValue.foodPrice),
      isPresent: formValue.isPresent,
      gemeinde: formValue.gemeinde,
    };

    this.guestApiService.addGuest(newGuest).subscribe({
      next: (guest) => {
        this.guests.update((guests) => [guest, ...guests]);
      },
      error: (error) => {
        console.error('Error adding guest:', error);
      },
    });
  }

  /**
   * removeGuest
   * Remove guest from the backend
   */
  public removeGuest(id: number): void {
    this.guestApiService.removeGuest(id).subscribe({
      next: () => {
        this.guests.update((guests) => guests.filter((g) => g.id !== id));
      },
      error: (error) => {
        console.error('Error removing guest:', error);
      },
    });
  }

  /**
   * toggleMenu
   * Toggle the open menu - only one menu can be open at a time
   */
  public toggleMenu(id: number): void {
    this.openMenuId.set(this.openMenuId() === id ? null : id);
  }

  /**
   * closeMenu
   * Close the menu
   */
  public closeMenu(): void {
    this.openMenuId.set(null);
  }

  /**
   * editGuest
   * Handle guest edit action and set the guest for editing
   */
  public editGuest(guest: IGuest): void {
    this.editingGuest.set(guest);
    this.closeMenu();
  }

  /**
   * cancelEditGuest
   * Cancel editing and clear the editing guest
   */
  public cancelEditGuest(): void {
    this.editingGuest.set(null);
  }

  /**
   * updateGuestData
   * Update guest data in the backend
   */
  public updateGuestData(updatedGuest: IGuest): void {
    this.guestApiService.updateGuest(updatedGuest).subscribe({
      next: (guest) => {
        this.guests.update((guests) =>
          guests.map((g) => (g.id === guest.id ? guest : g)),
        );
        this.editingGuest.set(null);
      },
      error: (error) => {
        console.error('Error updating guest:', error);
      },
    });
  }

  /**
   * togglePresent
   * Toggle guest present state and update in backend
   */
  public togglePresent(id: number): void {
    const guest = this.guests().find((g) => g.id === id);
    if (!guest) return;

    const updatedGuest: IGuest = { ...guest, isPresent: !guest.isPresent };
    this.guestApiService.updateGuest(updatedGuest).subscribe({
      next: (updated) => {
        this.guests.update((guests) =>
          guests.map((g) => (g.id === id ? updated : g)),
        );
      },
      error: (error) => {
        console.error('Error updating guest:', error);
      },
    });
  }

  /**
   * Handle clicks outside menu to close it
   */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    // Check if click target is outside the menu container
    const target = event.target as HTMLElement;
    const isMenuButton = target.closest('[data-menu-button]');
    const isMenuContent = target.closest('[data-menu-content]');

    // If click is outside menu button and menu content, close the menu
    if (!isMenuButton && !isMenuContent) {
      this.closeMenu();
    }
  }
}
