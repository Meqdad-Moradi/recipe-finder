import { Component, inject, output, signal } from '@angular/core';
import { IGuest } from '../../../modules/guests-module';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-guest-form',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './add-guest-form.html',
  styleUrl: './add-guest-form.scss',
})
export class AddGuestForm {
  private readonly fb = inject(FormBuilder);

  readonly addGuest = output<IGuest>();

  public guestForm: FormGroup;
  public fixedFoodPrice = signal<number>(13);
  public isEditingPrice = signal<boolean>(false);
  public tempFoodPrice: number = 13;

  constructor() {
    this.guestForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      guestCount: [2, [Validators.required, Validators.min(1)]],
      foodPrice: [{ value: this.fixedFoodPrice(), disabled: true }],
      isPresent: [true],
    });
  }

  /**
   * Set the fixed food price (for future admin settings)
   */
  public setFixedFoodPrice(price: number): void {
    this.fixedFoodPrice.set(price);
    this.guestForm.get('foodPrice')?.setValue(price);
  }

  /**
   * Enable food price editing
   */
  public enableEditPrice(): void {
    this.tempFoodPrice = this.fixedFoodPrice();
    this.isEditingPrice.set(true);
  }

  /**
   * Save the edited food price
   */
  public savePrice(): void {
    if (this.tempFoodPrice > 0) {
      this.setFixedFoodPrice(this.tempFoodPrice);
      this.isEditingPrice.set(false);
    }
  }

  /**
   * Cancel food price editing
   */
  public cancelEditPrice(): void {
    this.isEditingPrice.set(false);
    this.tempFoodPrice = this.fixedFoodPrice();
  }

  public onSubmit(e: Event): void {
    e.preventDefault();

    if (this.guestForm.invalid) {
      this.guestForm.markAllAsTouched();
      return;
    }

    const formValue = this.guestForm.value;
    const newGuest: IGuest = {
      id: 0, // ID will be set by the backend
      name: formValue.name,
      guestCount: formValue.guestCount,
      foodPrice: formValue.foodPrice,
      isPresent: formValue.isPresent,
    };

    // Emit the new guest to the parent component
    this.addGuest.emit(newGuest);
  }
}
