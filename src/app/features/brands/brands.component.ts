import { Component, inject, OnInit, signal } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { Brand } from '../../core/models/brand.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brands',
  imports: [RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent implements OnInit {
  private readonly brandsService = inject(BrandsService);
  brands = signal<Brand[]>([]);
  ngOnInit(): void {
    this.getBrands();
  }

  getBrands() {
    this.brandsService.getAllBrands().subscribe({
      next: (res) => {
        console.log(res);
        this.brands.set(res.data);
      },
      error: (err) => {
        console.log(err.message);
      },
    });
  }
}
