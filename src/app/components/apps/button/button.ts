import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {
  readonly btnText = input.required<string>();
  readonly disabled = input<boolean>();
  readonly click = output<void>();

  /**
   * onClick
   */
  public onClick(): void {
    if (this.disabled()) return;
    this.click.emit();
  }
}
