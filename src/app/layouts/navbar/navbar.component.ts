import { log } from 'console';
import { Component, computed, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LoginService } from '../../core/auth/services/login.service';
import { isPlatformBrowser } from '@angular/common';
import { CategoryService } from '../../core/services/category.service';
import { Category } from '../../core/models/category.interface';
import { CartService } from '../../core/services/cart.service';

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
  private readonly cartService = inject(CartService);
  private readonly router = inject(Router);
  user = {} as any;
  logged = computed(() => this.loginService.isLogged());
  cartCount = computed(() => this.cartService.cartCount());
  isDropdownOpen = signal<boolean>(false);
  ngOnInit(): void {
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      if (localStorage.getItem('freshToken')) {
        this.loginService.isLogged.set(true);
        console.log(this.logged());
        this.setCartCount();
        this.user = JSON.parse(localStorage.getItem('freshUser')!);
        console.log(this.user);
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
  setCartCount() {
    this.cartService.getCart().subscribe({
      next: (res) => {
        this.cartService.cartCount.set(res.numOfCartItems);
      },
    });
  }
  toggleProfileOptions() {
    this.isDropdownOpen.set(!this.isDropdownOpen());
  }
}
