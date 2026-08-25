import { AdressComponent } from './features/adress/adress.component';
import { Routes } from '@angular/router';
import { authGuard } from './core/auth/guard/auth-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then((m) => m.HomeComponent),
    title: 'Home Page',
  },
  {
    path: 'search',
    loadComponent: () =>
      import('./features/search/search.component').then((m) => m.SearchComponent),
    title: 'Home Page',
  },
  {
    path: 'shop',
    loadComponent: () => import('./features/shop/shop.component').then((m) => m.ShopComponent),
    title: 'Shop Page',
  },
  {
    path: 'categories',
    loadComponent: () =>
      import('./features/categories/categories.component').then((m) => m.CategoriesComponent),
    title: 'Categories Page',
  },
  {
    path: 'subcategories/:id',
    loadComponent: () =>
      import('./features/subcategories/subcategories.component').then(
        (m) => m.SubcategoriesComponent,
      ),
    title: 'Categories Page',
  },
  {
    path: 'speciSubcategories/:id',
    loadComponent: () =>
      import('./features/speci-subcategory/speci-subcategory.component').then(
        (m) => m.SpeciSubcategoryComponent,
      ),
    title: 'Categories Page',
  },

  {
    path: 'brands',
    loadComponent: () =>
      import('./features/brands/brands.component').then((m) => m.BrandsComponent),
    title: 'Brands Page',
  },
  {
    path: 'wishlist',
    loadComponent: () =>
      import('./features/wishlist/wishlist.component').then((m) => m.WishlistComponent),
    title: 'Wishlist Page',
    canActivate: [authGuard],
  },
  {
    path: 'cart',
    loadComponent: () => import('./features/cart/cart.component').then((m) => m.CartComponent),
    title: 'Cart Page',
    canActivate: [authGuard],
  },
  {
    path: 'details/:id/:title',
    loadComponent: () =>
      import('./features/details/details.component').then((m) => m.DetailsComponent),
    title: 'Details Page',
  },
  {
    path: 'checkout/:id',
    loadComponent: () =>
      import('./features/checkout/checkout.component').then((m) => m.CheckoutComponent),
    title: 'Checkout Page',
    canActivate: [authGuard],
  },
  {
    path: 'brandDetails/:id',
    loadComponent: () =>
      import('./features/brand-details/brand-details.component').then(
        (m) => m.BrandDetailsComponent,
      ),
    title: 'brand Page',
  },
  {
    path: 'allorders',
    loadComponent: () =>
      import('./features/orders/orders.component').then((m) => m.OrdersComponent),
    title: 'Orders Page',
    canActivate: [authGuard],
  },
  {
    path: 'login',
    loadComponent: () => import('./features/login/login.component').then((m) => m.LoginComponent),
    title: 'Login Page',
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/register/register.component').then((m) => m.RegisterComponent),
    title: 'Register Page',
  },
  {
    path: 'forgot',
    loadComponent: () =>
      import('./features/forgot/forgot.component').then((m) => m.ForgotComponent),
    title: 'Forgot Password Page',
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./features/profile/profile.component').then((m) => m.ProfileComponent),
    title: 'Profile Page',
    children: [
      { path: '', redirectTo: 'addresses', pathMatch: 'full' },
      {
        path: 'addresses',
        loadComponent: () =>
          import('./features/adress/adress.component').then((m) => m.AdressComponent),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./features/settings/settings.component').then((m) => m.SettingsComponent),
      },
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./features/notfound/notfound.component').then((m) => m.NotfoundComponent),
    title: 'Notfound Page',
  },
];
