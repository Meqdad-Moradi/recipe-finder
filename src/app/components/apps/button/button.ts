import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-button',
  imports: [RouterLink],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {
  readonly btnText = input.required<string>();
  readonly routerLink = input<string>('');

  readonly click = output<void>();

  /**
   * onClick
   */
  public onClick(): void {
    this.click.emit();
  }
}
