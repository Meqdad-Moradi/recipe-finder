import { Component, model, output, input } from '@angular/core';
import { IGuest } from '../../../modules/guests-module';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-guest',
  imports: [NgClass],
  templateUrl: './guest.html',
  styleUrl: './guest.scss',
})
export class Guest {
  readonly guest = model.required<IGuest>();
  readonly openMenuId = input.required<number | null>();

  readonly togglePresent = output<number>();
  readonly removeGuest = output<number>();
  readonly toggleMenu = output<number>();
  readonly editGuest = output<IGuest>();

  /**
   * getGuestTotalPrice
   * Calculate total price for a guest
   */
  public getGuestTotalPrice(guest: IGuest): number {
    return guest.foodPrice * guest.guestCount;
  }

  public onTogglePresence(): void {
    this.togglePresent.emit(this.guest().id);
  }

  public onRemoveGuest(): void {
    this.removeGuest.emit(this.guest().id);
  }

  /**
   * onToggleMenu
   * Emit toggle menu event to parent
   */
  public onToggleMenu(): void {
    this.toggleMenu.emit(this.guest().id);
  }

  /**
   * onEditGuest
   * Emit edit guest event to parent
   */
  public onEditGuest(): void {
    this.editGuest.emit(this.guest());
  }
}
