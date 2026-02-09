import {
  Component,
  ElementRef,
  inject,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { NgClass } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IGuest } from '../../../modules/guests-module';

@Component({
  selector: 'app-add-guest-form',
  imports: [FormsModule, ReactiveFormsModule, NgClass],
  templateUrl: './add-guest-form.html',
  styleUrl: './add-guest-form.scss',
})
export class AddGuestForm {
  private readonly fb = inject(FormBuilder);

  readonly addGuest = output<IGuest>();

  public guestForm: FormGroup;
  public fixedFoodPrice = signal<number>(13);
  public isEditingPrice = signal<boolean>(false);

  readonly foodPriceInput =
    viewChild<ElementRef<HTMLInputElement>>('foodPriceInput');
  readonly nameInput = viewChild<ElementRef<HTMLInputElement>>('nameInput');

  constructor() {
    this.guestForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      guestCount: [2, [Validators.required, Validators.min(1)]],
      foodPrice: [13, { disabled: true }],
      isPresent: [true],
    });
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
   * @param e Event
   * @returns void
   */
  public onSubmit(e: Event): void {
    e.preventDefault();

    if (this.guestForm.invalid) {
      this.guestForm.markAllAsTouched();
      return;
    }

    const newGuest: IGuest = {
      id: 0, // ID will be set by the backend
      name: this.guestForm?.value?.name,
      guestCount: this.guestForm?.value?.guestCount,
      foodPrice: this.guestForm?.value?.foodPrice,
      isPresent: this.guestForm?.value?.isPresent,
    };

    // set the fixed food price to the new guest
    this.fixedFoodPrice.set(Number(newGuest.foodPrice));

    // Emit the new guest to the parent component
    this.addGuest.emit(newGuest);

    // Reset the form after submission
    this.reset();
  }

  /**
   * reset
   * Reset the form to its initial state and focus the name input field
   */
  private reset(): void {
    this.guestForm.reset({
      name: '',
      guestCount: 2,
      foodPrice: this.fixedFoodPrice(),
      isPresent: true,
    });
    this.isEditingPrice.set(false);
    this.nameInput()?.nativeElement?.focus();
  }
}
