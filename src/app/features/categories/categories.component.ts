import { Category } from './../../core/models/category.interface';
import { CategoryService } from './../../core/services/category.service';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent {
  private readonly categoryService = inject(CategoryService);
  categories = signal<Category[]>([]);
  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (res) => {
        console.log(res);
        this.categories.set(res.data);
      },
      error: (err) => {
        console.log(err.message);
      },
    });
  }
}
