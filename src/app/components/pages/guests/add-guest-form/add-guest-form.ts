import {
  Component,
  ElementRef,
  inject,
  output,
  signal,
  viewChild,
  input,
  effect,
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
  readonly updateGuest = output<IGuest>();
  readonly cancel = output<void>();

  readonly editingGuest = input<IGuest | null>(null);

  public guestForm: FormGroup;
  public fixedFoodPrice = signal<number>(13);
  public isEditingPrice = signal<boolean>(false);
  public isEditing = signal<boolean>(false);

  readonly foodPriceInput =
    viewChild<ElementRef<HTMLInputElement>>('foodPriceInput');
  readonly nameInput = viewChild<ElementRef<HTMLInputElement>>('nameInput');

  public gemeinden: string[] = [
    'Serfaus',
    'Prutz',
    'Landeck',
    'Zams',
    'Imst',
    'Imsterberg',
    'Haiming',
    'Telfs',
    'Zirl',
    'Innsbruck',
    'Fritzens',
    'Wien',
  ];

  constructor() {
    this.guestForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      guestCount: [2, [Validators.required, Validators.min(1)]],
      foodPrice: [13, { disabled: true }],
      isPresent: [true],
      gemeinde: ['', [Validators.required]],
    });

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
    this.guestForm.patchValue({
      name: guest.name,
      guestCount: guest.guestCount,
      foodPrice: guest.foodPrice,
      isPresent: guest.isPresent,
      gemeinde: guest.gemeinde,
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

    if (this.guestForm.invalid) {
      this.guestForm.markAllAsTouched();
      return;
    }

    const guestData: IGuest = {
      id: this.isEditing() ? this.editingGuest()?.id || 0 : 0,
      name: this.guestForm?.value?.name,
      guestCount: this.guestForm?.value?.guestCount,
      foodPrice: this.guestForm?.value?.foodPrice,
      isPresent: this.guestForm?.value?.isPresent,
      gemeinde: this.guestForm?.value?.gemeinde,
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
    this.guestForm.reset({
      name: '',
      guestCount: 2,
      foodPrice: this.fixedFoodPrice(),
      isPresent: true,
      gemeinde: '',
    });
    this.isEditingPrice.set(false);
    this.isEditing.set(false);
    this.nameInput()?.nativeElement?.focus();
  }
}
