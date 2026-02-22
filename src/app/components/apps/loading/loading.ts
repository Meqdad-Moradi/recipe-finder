import { Component, input } from '@angular/core';

@Component({
  selector: 'app-loading',
  imports: [],
  templateUrl: './loading.html',
  styleUrl: './loading.scss',
})
export class Loading {
  readonly message = input<string>('Loading...');
  readonly size = input<'sm' | 'md' | 'lg'>('sm');
}
