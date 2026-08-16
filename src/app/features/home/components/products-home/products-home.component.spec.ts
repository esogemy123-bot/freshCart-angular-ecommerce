import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsHomeComponent } from './products-home.component';

describe('ProductsHomeComponent', () => {
  let component: ProductsHomeComponent;
  let fixture: ComponentFixture<ProductsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsHomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsHomeComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
