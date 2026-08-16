import { Component, OnInit, WritableSignal, afterNextRender, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-promo-banners',
  imports: [RouterLink],
  templateUrl: './promo-banners.component.html',
  styleUrl: './promo-banners.component.css',
})
export class PromoBannersComponent implements OnInit {
  isInit: WritableSignal<boolean> = signal(false);

  ngOnInit(): void {
    setTimeout(() => {
      this.isInit.set(true);
    }, 50);
  }
}
