import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-slider',
  imports: [],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SliderComponent implements OnInit {
  isInit = signal<boolean>(false);
  ngOnInit(): void {
    setTimeout(() => {
      this.isInit.set(true);
    }, 50);
  }
}
