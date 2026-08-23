import { Component, inject, signal } from '@angular/core';
import { CategoryService } from '../../../../core/services/category.service';
import { Category } from '../../../../core/models/category.interface';
import { H2Component } from '../../../../shared/ui/components/headings/h2/h2.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories-home',
  imports: [H2Component, RouterLink],
  templateUrl: './categories-home.component.html',
  styleUrl: './categories-home.component.css',
})
export class CategoriesHomeComponent {
  private readonly categoryService = inject(CategoryService);
  allCategories = signal<Category[]>([]);
  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (res) => {
        this.allCategories.set(res.data);
        console.log(this.allCategories());
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
