import { Component } from '@angular/core';
import { ProductsHomeComponent } from '../home/components/products-home/products-home.component';

@Component({
  selector: 'app-shop',
  imports: [ProductsHomeComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent {}
