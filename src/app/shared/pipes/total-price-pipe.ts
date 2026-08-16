import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'totalPrice',
})
export class TotalPricePipe implements PipeTransform {
  transform(amount: number, price: number): unknown {
    const totalPrice = amount * price;
    return totalPrice;
  }
}
