import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from '../../core/models/brand.interface';
import { CartService } from '../../core/services/cart.service';
import { BrandItem } from '../brands/brand-item.interface';
import { CategoryService } from '../../core/services/category.service';
import { SubcategoriesService } from '../../core/services/subcategories.service';
import { Category } from '../../core/models/category.interface';
import { Subcategory } from '../../core/models/subcategory.interface';

@Component({
  selector: 'app-subcategories',
  imports: [RouterLink],
  templateUrl: './subcategories.component.html',
  styleUrl: './subcategories.component.css',
})
export class SubcategoriesComponent {
  private readonly categoryService = inject(CategoryService);
  private readonly subcategoriesService = inject(SubcategoriesService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);

  categoryId = signal('');
  category = signal<Category>({} as Category);
  subcategories = signal<Subcategory[]>([]);
  brandDetails = signal<BrandItem[]>([]);

  ngOnInit(): void {
    this.categoryId.set(this.activatedRoute.snapshot.paramMap.get('id')!);
    console.log('category ID:', this.categoryId);
    if (this.categoryId()) {
      this.GetAllSubCategoriesOnCategory();
      this.getSpecificCategory();
    }
  }

  getSpecificCategory() {
    this.categoryService.getSpecificCategory(this.categoryId()).subscribe({
      next: (res) => {
        console.log(res);
        this.category.set(res.data);
        console.log(this.category());
      },
      error: (err) => {
        console.log(err.message);
      },
    });
  }

  // getSpecificSubcategory(subCategoryId: string) {
  //   this.subcategoriesService.getSpecificSubcategory(subCategoryId).subscribe({
  //     next: (res) => {
  //       console.log(res);
  //       this.subcategory.set(res.data);
  //       console.log(this.subcategory());
  //     },
  //     error: (err) => {
  //       console.log(err.message);
  //     },
  //   });
  // }

  GetAllSubCategoriesOnCategory() {
    this.subcategoriesService.GetAllSubCategoriesOnCategory(this.categoryId()!).subscribe({
      next: (res) => {
        console.log(res);
        this.subcategories.set(res.data);
        console.log(this.subcategories());
      },
      error: (err) => {
        console.log(err.message);
      },
    });
  }

  // ============================================

  addProductToCart(productId: string) {
    if (localStorage.getItem('freshToken')) {
      this.cartService.addProduct(productId).subscribe({
        next: (res) => {
          this.toastrService.success(res.message, 'FreshCart', {
            progressBar: true,
            closeButton: true,
          });
        },
        error: (err) => {
          this.toastrService.warning(err.message, 'FreshCart', {
            progressBar: true,
            closeButton: true,
          });
        },
      });
    }
  }
}
