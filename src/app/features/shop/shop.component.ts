import { Component, inject, signal } from '@angular/core';
import { Product } from '../../core/models/product.interface';
import { ProductsService } from '../../core/services/products.service';
import { H2Component } from '../../shared/ui/components/headings/h2/h2.component';
import { ProductComponent } from '../../shared/ui/components/product/product.component';

@Component({
  selector: 'app-shop',
  imports: [H2Component, ProductComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent {
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
