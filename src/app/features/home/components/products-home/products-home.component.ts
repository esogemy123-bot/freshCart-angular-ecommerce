import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductsService } from '../../../../core/services/products.service';
import { Product } from '../../../../core/models/product.interface';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { H2Component } from '../../../../shared/ui/components/headings/h2/h2.component';
import { DiscountPercentagePipe } from '../../../../shared/pipes/discount-percentage-pipe';
import { ProductComponent } from '../../../../shared/ui/components/product/product.component';

@Component({
  selector: 'app-products-home',
  imports: [H2Component, ProductComponent],
  templateUrl: './products-home.component.html',
  styleUrl: './products-home.component.css',
})
export class ProductsHomeComponent implements OnInit {
  private readonly productsService = inject(ProductsService);

  allProducts = signal<Product[]>([]);
  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        this.allProducts.set(res.data);
        console.log(this.allProducts());
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
