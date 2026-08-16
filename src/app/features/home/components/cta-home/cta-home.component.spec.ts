import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtaHomeComponent } from './cta-home.component';

describe('CtaHomeComponent', () => {
  let component: CtaHomeComponent;
  let fixture: ComponentFixture<CtaHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CtaHomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CtaHomeComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
