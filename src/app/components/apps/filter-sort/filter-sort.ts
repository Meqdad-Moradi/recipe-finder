import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-sort',
  imports: [CommonModule, FormsModule],
  templateUrl: './filter-sort.html',
  styleUrl: './filter-sort.scss',
})
export class FilterSort {
  readonly first = input.required<string>();
  readonly second = input.required<string>();
  readonly third = input.required<string>();

  // Output signal to emit search values
  readonly searchValue = output<string>();

  // Internal signal to track search input
  private search = signal<string>('');

  /**
   * Handle search input change and emit to parent
   */
  public onSearchChange(value: string): void {
    this.search.set(value);
    this.searchValue.emit(value);
  }
}
