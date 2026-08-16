import { Component, inject, OnInit, signal } from '@angular/core';
import { Product } from '../../core/models/product.interface';
import { ProductsService } from '../../core/services/products.service';
import { ActivatedRoute } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-details',
  imports: [CurrencyPipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  productId = signal<string>('');
  productTitle = signal<string>('');
  private readonly productsService = inject(ProductsService);
  private readonly activatedRoute = inject(ActivatedRoute);
  product = signal<Product>({} as Product);
  activeImage = signal<string>('');
  ngOnInit(): void {
    this.productId.set(this.activatedRoute.snapshot.paramMap.get('id')!);
    this.productTitle.set(this.activatedRoute.snapshot.paramMap.get('title')!);
    this.getSpecificProduct(this.productId());
  }
  getSpecificProduct(productId: string) {
    this.productsService.getSpecificProduct(productId).subscribe({
      next: (res) => {
        this.product.set(res.data);
        console.log(this.product());
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
