import { Brand } from './../../core/models/brand.interface';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { ProductQueryParams } from '../../core/models/product-query-params.interface';
import { BrandsService } from '../../core/services/brands.service';
import { CategoryService } from '../../core/services/category.service';
import { Category } from '../../core/models/category.interface';
import { Product } from '../../core/models/product.interface';
import { ProductComponent } from '../../shared/ui/components/product/product.component';

@Component({
  selector: 'app-search',
  imports: [ProductComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly brandsService = inject(BrandsService);
  private readonly categoryService = inject(CategoryService);

  ngOnInit(): void {
    this.getBrands();
    this.getCategories();
    this.loadProducts();
  }

  // تخيل دي الأري اللي شايلة البراندات اللي اليوزر اختارها من الـ HTML
  allProducts = signal<Product[]>([]);
  allBrands = signal<Brand[]>([]);
  allCategories = signal<Category[]>([]);
  selectedBrands = signal<string[]>([]);
  selectedCategorys = signal<string[]>([]);
  selectedParams = signal<ProductQueryParams>({} as ProductQueryParams);
  priceGTE = signal<number>(100);
  priceLTE = signal<number>(500);
  sort = signal<string>('price');
  searchValue = signal<string>('');
  isGridView = signal<boolean>(true);

  changeDisplay() {
    this.isGridView.set(!this.isGridView());
  }

  loadProducts() {
    this.productsService.getAllProducts(this.selectedParams()).subscribe({
      next: (res) => {
        this.allProducts.set(res.data);
        console.log(res);
      },
    });
  }

  onBrandChange(brandId: string, isChecked: boolean) {
    // 1. نحدث أري البراندات بطريقة الـ Immutable
    this.selectedBrands.update((brands) => {
      const updatedBrands = isChecked
        ? [...brands, brandId] // لو اتعلم عليها ضيفها
        : brands.filter((id) => id !== brandId); // لو اتشالت احذفها

      // 2. نحدث الأوبجكت بتاع الباراميترز بناءً على التحديث الجديد
      this.selectedParams.update((params) => ({
        ...params,
        brand: updatedBrands.length > 0 ? updatedBrands : undefined, // لو فاضية بنلغيها من الـ params
      }));
      console.log(updatedBrands);
      return updatedBrands;
    });
    this.loadProducts();
  }

  // نفس الكلام للـ Categories
  onCategoryChange(categoryId: string, isChecked: boolean) {
    this.selectedCategorys.update((categories) => {
      const updatedCategories = isChecked
        ? [...categories, categoryId]
        : categories.filter((id) => id !== categoryId);

      this.selectedParams.update((params) => ({
        ...params,
        categoryId: updatedCategories.length > 0 ? updatedCategories : undefined,
      }));
      console.log(updatedCategories);

      return updatedCategories;
    });
    this.loadProducts();
  }

  getBrands() {
    this.brandsService.getAllBrands().subscribe((res) => {
      this.allBrands.set(res.data);
      console.log(res);
    });
  }
  getCategories() {
    this.categoryService.getAllCategories().subscribe((res) => {
      this.allCategories.set(res.data);
      console.log(res);
    });
  }

  searchChange(value: string) {
    this.selectedParams.update((params) => ({
      ...params,
      keyword: value,
    }));
    this.loadProducts();
  }

  setGTE(value: number) {
    this.priceGTE.set(value);
    this.selectedParams.update((params) => ({
      ...params,
      priceGte: value,
    }));
    this.loadProducts();
  }

  setLTE(value: number) {
    this.priceLTE.set(value);
    this.selectedParams.update((params) => ({
      ...params,
      priceLte: value,
    }));
    this.loadProducts();
  }

  setSort(sort: string) {
    this.sort.set(sort);
    this.selectedParams.update((params) => ({
      ...params,
      sort: sort,
    }));
    this.loadProducts();
  }
  clearFilters() {
    this.selectedBrands.set([]);
    this.selectedCategorys.set([]);
    this.priceGTE.set(0);
    this.priceLTE.set(0);
    this.sort.set('price');
    this.searchValue.set('');
    this.isGridView.set(true);
    this.selectedParams.set({} as ProductQueryParams);
    this.loadProducts();
  }

  // setBrandsValue(brandId: string) {
  //   if (this.selectedBrands().length === 0) {
  //     this.selectedParams().brand = brandId;
  //   } else {
  //     this.selectedBrands().push(brandId);
  //     this.selectedParams().brand = this.selectedBrands();
  //   }
  // }
  // setCategoriesValue(categoryId: string) {
  //   if (this.selectedCategorys().length === 0) {
  //     this.selectedParams().categoryId = categoryId;
  //   } else {
  //     this.selectedCategorys().push(categoryId);
  //     this.selectedParams().categoryId = this.selectedCategorys();
  //   }
  // }
  // دالة التعامل مع البراندات (إضافة لو معلم، أو حذف لو شايل العلامة)
}
