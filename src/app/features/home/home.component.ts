import { CategoriesComponent } from '../categories/categories.component';
import { CategoriesHomeComponent } from './components/categories-home/categories-home.component';
import { ProductsHomeComponent } from './components/products-home/products-home.component';
import { SliderComponent } from './components/slider/slider.component';
import { Component } from '@angular/core';
import { CtaHomeComponent } from './components/cta-home/cta-home.component';
import { PromoBannersComponent } from './components/promo-banners/promo-banners.component';

@Component({
  selector: 'app-home',
  imports: [
    SliderComponent,
    CategoriesHomeComponent,
    ProductsHomeComponent,
    CtaHomeComponent,
    PromoBannersComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
