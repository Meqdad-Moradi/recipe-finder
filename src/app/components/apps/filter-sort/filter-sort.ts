import { CommonModule } from '@angular/common';
import { Component, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomSearch } from '../custom-search/custom-search';
import { DropdownControl } from '../dropdown-control/dropdown-control';

@Component({
  selector: 'app-filter-sort',
  imports: [CommonModule, FormsModule, CustomSearch, DropdownControl],
  templateUrl: './filter-sort.html',
  styleUrl: './filter-sort.scss',
})
export class FilterSort {
  readonly first = input.required<string>();
  readonly second = input.required<string>();
  readonly third = input.required<string>();
  readonly searchQuery = model<string>('');
  readonly filterOptions = input.required<string[]>();
  readonly selectedFilterValue = model.required<string>();
}
