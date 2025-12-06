import { Component, input } from '@angular/core';

@Component({
  selector: 'app-dropdown-control',
  imports: [],
  templateUrl: './dropdown-control.html',
  styleUrl: './dropdown-control.scss',
})
export class DropdownControl {
  readonly options = input.required<string[]>();
}
