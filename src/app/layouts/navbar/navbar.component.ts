import { log } from 'console';
import { Component, computed, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LoginService } from '../../core/auth/services/login.service';
import { isPlatformBrowser } from '@angular/common';
import { CategoryService } from '../../core/services/category.service';
import { Category } from '../../core/models/category.interface';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  isOpen = signal<boolean>(false);
  categories = signal<Category[]>([]);
  private readonly loginService = inject(LoginService);
  private readonly categoryService = inject(CategoryService);
  private readonly pLATFORM_ID = inject(PLATFORM_ID);
  private readonly router = inject(Router);
  logged = computed(() => this.loginService.isLogged());

  ngOnInit(): void {
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      if (localStorage.getItem('freshToken')) {
        this.loginService.isLogged.set(true);
        console.log(this.logged());
      }
    }
    this.getCategories();
  }
  toggleNav() {
    if (this.isOpen() === false) {
      this.isOpen.set(true);
    } else {
      this.isOpen.set(false);
    }
    console.log(this.isOpen());
  }
  logOut() {
    this.loginService.isLogged.set(false);
    localStorage.removeItem('freshToken');
    this.router.navigate(['/']);
    console.log(this.logged());
  }
  getCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (res) => {
        console.log(res);
        this.categories.set(res.data);
      },
    });
  }
}
