import { Component, input, model, output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dropdown-control',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './dropdown-control.html',
  styleUrl: './dropdown-control.scss',
})
export class DropdownControl {
  readonly options = input.required<string[]>();
  public selectValue = model<string>();
}
