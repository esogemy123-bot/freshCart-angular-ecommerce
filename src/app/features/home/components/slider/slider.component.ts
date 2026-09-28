import {
  afterNextRender,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  inject, 
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-slider',
  imports: [RouterLink],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SliderComponent {
  private elementRef = inject(ElementRef);

  isInit = signal<boolean>(false); 
  constructor() { 
    afterNextRender(() => {
      const observer = new IntersectionObserver(
        ([entry]) => { 
          if (entry.isIntersecting) {
            this.isInit.set(true); 
            observer.disconnect();
          }
        },
        { threshold: 0.1 },
      );

      observer.observe(this.elementRef.nativeElement);
    });
  }
}
