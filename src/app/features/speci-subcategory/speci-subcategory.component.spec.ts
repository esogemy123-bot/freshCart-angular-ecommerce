import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeciSubcategoryComponent } from './speci-subcategory.component';

describe('SpeciSubcategoryComponent', () => {
  let component: SpeciSubcategoryComponent;
  let fixture: ComponentFixture<SpeciSubcategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpeciSubcategoryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SpeciSubcategoryComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
