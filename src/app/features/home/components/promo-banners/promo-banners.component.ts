import {
  Component,
  ElementRef,
  OnInit,
  WritableSignal,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-promo-banners',
  imports: [RouterLink],
  templateUrl: './promo-banners.component.html',
  styleUrl: './promo-banners.component.css',
})
export class PromoBannersComponent {
  isInit: WritableSignal<boolean> = signal(false);
  private elementRef = inject(ElementRef);

  constructor() {
    // بنستخدم afterNextRender عشان نضمن إن الكود يشتغل في المتصفح فقط بعد ما الصفحة ترسم
    afterNextRender(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          // لو العنصر دخل في نطاق رؤية المستخدم (Viewport)
          if (entry.isIntersecting) {
            this.isInit.set(true); // هنفعل الأنيميشن
            observer.disconnect(); // نوقف المراقبة خلاص لأنه اشتغل مرة واحدة كفاية
          }
        },
        { threshold: 0.2 }, // أول ما 20% من البانرز تظهر على الشاشة الأنيميشن هيشتغل
      );

      // بنراقب الحاوية الأساسية للكونسول أو السكشن
      observer.observe(this.elementRef.nativeElement);
    });
  }
}
