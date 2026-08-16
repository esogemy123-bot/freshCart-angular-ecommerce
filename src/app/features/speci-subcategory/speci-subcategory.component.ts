import { Subcategory } from './../../core/models/subcategory.interface';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from '../../core/models/category.interface';
import { CartService } from '../../core/services/cart.service';
import { CategoryService } from '../../core/services/category.service';
import { SubcategoriesService } from '../../core/services/subcategories.service';
import { BrandItem } from '../brands/brand-item.interface';

@Component({
  selector: 'app-speci-subcategory',
  imports: [RouterLink],
  templateUrl: './speci-subcategory.component.html',
  styleUrl: './speci-subcategory.component.css',
})
export class SpeciSubcategoryComponent {
  private readonly subcategoriesService = inject(SubcategoriesService);
  private readonly activatedRoute = inject(ActivatedRoute);

  subcategoryId = signal('');
  subcategory = signal<Subcategory>({} as Subcategory);
  subcategories = signal<Subcategory[]>([]);
  brandDetails = signal<BrandItem[]>([]);

  ngOnInit(): void {
    this.subcategoryId.set(this.activatedRoute.snapshot.paramMap.get('id')!);
    if (this.subcategoryId()) {
      this.getSpecificSubcategory(this.subcategoryId());
    }
  }

  getSpecificSubcategory(subsubcategoryId: string) {
    this.subcategoriesService.getSpecificSubcategory(subsubcategoryId).subscribe({
      next: (res) => {
        console.log(res);
        this.subcategory.set(res.data);
      },
      error: (err) => {
        console.log(err.message);
      },
    });
  }
}
