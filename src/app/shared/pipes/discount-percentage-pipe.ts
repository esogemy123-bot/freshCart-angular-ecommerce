import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discountPercentage',
})
export class DiscountPercentagePipe implements PipeTransform {
  transform(totalPrice: number, priceAfterDiscount: number): unknown {
    const difference: number = totalPrice - priceAfterDiscount;
    const discountPercentage: number = (difference / totalPrice) * 100;
    return Math.round(Math.abs(discountPercentage));
  }
}
