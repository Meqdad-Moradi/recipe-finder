import { Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-custom-search',
  imports: [FormsModule],
  templateUrl: './custom-search.html',
  styleUrl: './custom-search.scss',
})
export class CustomSearch {
  public searchQuery = model<string>();
}
