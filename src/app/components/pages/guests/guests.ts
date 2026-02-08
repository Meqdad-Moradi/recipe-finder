import {
  Component,
  computed,
  inject,
  OnInit,
  signal,
  HostListener,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SectionHeading } from '../../apps/section-heading/section-heading';
import { ApiGuests } from '../../../services/api-guests';
import { IGuest } from '../../modules/guests-module';
import { Guest } from './guest/guest';
import { AddGuestForm } from './add-guest-form/add-guest-form';
import { FilterSort } from '../../apps/filter-sort/filter-sort';

@Component({
  selector: 'app-guests',
  imports: [
    ReactiveFormsModule,
    FormsModule,
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
        this.guests.set(guests);
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
    const newGuest: Omit<IGuest, 'id'> = {
      name: formValue.name,
      guestCount: Number(formValue.guestCount),
      foodPrice: formValue.foodPrice,
      isPresent: formValue.isPresent,
    };

    this.guestApiService.addGuest(newGuest).subscribe({
      next: (guest) => {
        this.guests.update((guests) => [...guests, guest]);
        // Reset food price to current fixed price
        // this.guestForm.get('foodPrice')?.setValue(this.fixedFoodPrice());
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
