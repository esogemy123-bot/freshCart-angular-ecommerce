import { Component, input } from '@angular/core';
@Component({
  selector: 'app-h2',
  imports: [],
  templateUrl: './h2.component.html',
  styleUrl: './h2.component.css',
})
export class H2Component {
  firstWord = input<string>('');
  highlightedWord = input<string>('');
}
