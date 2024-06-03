import { Pipe, PipeTransform } from '@angular/core';
import { OrderArticleForClient } from './purchase-order/purchase-order.model';

@Pipe({
  name: 'articleListStringPipe',
  standalone: true
})
export class ArticleListStringPipePipe implements PipeTransform {

  transform(value: OrderArticleForClient[], ...args: unknown[]): string {
    return value.map(a => a.name).join(',');
  }

}
