import { NgClass } from '@angular/common';
import {
  Component,
  effect,
  ElementRef,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { form, FormField } from '@angular/forms/signals';
import {
  createInitialGuest,
  guestSchema,
  IGuest,
} from '../../../modules/guests-module';

@Component({
  selector: 'app-add-guest-form',
  imports: [NgClass, FormField],
  templateUrl: './add-guest-form.html',
  styleUrl: './add-guest-form.scss',
})
export class AddGuestForm {
  private readonly fb = inject(FormBuilder);

  readonly editingGuest = input<IGuest | null>(null);
  readonly gemeinden = input.required<string[]>();

  readonly addGuest = output<IGuest>();
  readonly updateGuest = output<IGuest>();
  readonly cancel = output<void>();

  readonly guestModel = signal<IGuest>(createInitialGuest());

  public guestForm = form(this.guestModel, guestSchema);
  public fixedFoodPrice = signal<number>(13);
  public isEditingPrice = signal<boolean>(false);
  public isEditing = signal<boolean>(false);

  readonly foodPriceInput =
    viewChild<ElementRef<HTMLInputElement>>('foodPriceInput');
  readonly nameInput = viewChild<ElementRef<HTMLInputElement>>('nameInput');

  constructor() {
    // Watch for changes to editingGuest input
    effect(() => {
      const guest = this.editingGuest();
      if (guest) {
        this.loadEditGuest(guest);
      }
    });
  }

  /**
   * loadEditGuest
   * Populate the form with guest data for editing
   */
  public loadEditGuest(guest: IGuest): void {
    this.isEditing.set(true);
    this.fixedFoodPrice.set(Number(guest.foodPrice));
    this.guestModel.set({
      id: guest.id,
      name: guest.name,
      guestCount: guest.guestCount,
      foodPrice: guest.foodPrice,
      isPresent: guest.isPresent,
      gemeinde: guest.gemeinde,
      invited: guest.invited,
      phone: guest.phone,
    });
    this.nameInput()?.nativeElement?.focus();
  }

  /**
   * cancelEdit
   * Cancel editing and reset the form
   */
  public cancelEdit(): void {
    this.isEditing.set(false);
    this.cancel.emit();
    this.reset();
  }

  /**
   * enableEditPrice
   * Enable food price editing and focus the input field
   */
  public enableEditPrice(): void {
    this.foodPriceInput()?.nativeElement?.focus();
    this.foodPriceInput()?.nativeElement?.select();
    this.isEditingPrice.set(true);
  }

  /**
   * Save the edited food price
   */
  public savePrice(): void {
    this.isEditingPrice.set(false);
  }

  /**
   * Cancel food price editing
   */
  public cancelEditPrice(): void {
    this.isEditingPrice.set(false);
  }

  /**
   * onSubmit
   * Handle both adding new guest and updating existing guest
   * @param e Event
   * @returns void
   */
  public onSubmit(e: Event): void {
    e.preventDefault();

    if (this.guestForm().invalid()) {
      return;
    }

    const guestData: IGuest = {
      id: this.isEditing() ? this.editingGuest()?.id || 0 : 0,
      name: this.guestForm().value.name,
      guestCount: Number(this.guestForm().value().guestCount),
      foodPrice: Number(this.guestForm().value().foodPrice),
      isPresent: this.guestForm().value().isPresent,
      gemeinde: this.guestForm().value().gemeinde,
      invited: this.guestForm().value().invited,
      phone: this.guestForm().value().phone,
    };

    // set the fixed food price
    this.fixedFoodPrice.set(Number(guestData.foodPrice));

    if (this.isEditing()) {
      // Emit update event
      this.updateGuest.emit(guestData);
      this.isEditing.set(false);
    } else {
      // Emit add event
      this.addGuest.emit(guestData);
    }

    // Reset the form after submission
    this.reset();
  }

  /**
   * reset
   * Reset the form to its initial state and focus the name input field
   */
  private reset(): void {
    this.guestModel.set({
      ...createInitialGuest(),
      foodPrice: this.fixedFoodPrice(),
    });
    this.isEditingPrice.set(false);
    this.isEditing.set(false);
    this.nameInput()?.nativeElement?.focus();
  }
}
