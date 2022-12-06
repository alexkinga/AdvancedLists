import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Observable, Subject, combineLatest, BehaviorSubject, of} from 'rxjs';
import {  map } from 'rxjs/operators';
import { ProductModel } from '../../models/product.model';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-filtered-product-list',
  templateUrl: './filtered-product-list.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilteredProductListComponent {
  readonly categories$: Observable<string[]> = this._categoriesService.getAll();
  private _categorySubject: Subject<string> = new Subject<string>();
  public category$: Observable<string> = this._categorySubject.asObservable();

  private _orderSubject: BehaviorSubject<string> = new BehaviorSubject<string>('asc');
  public orders: Observable<string[]> = of(['asc', 'desc']);
  public order$: Observable<string> = this._orderSubject.asObservable();


  readonly product$: Observable<ProductModel[]> = combineLatest([
    this._productsService.getAll(),
    this.category$,
    this.order$
  ]).pipe(
    map(([products, category, order]: [ProductModel[], string, string]) => {
      return products.filter(product => product.category === category)
        .sort((a,b) => {
          if (a.price > b.price) return order === 'asc' ? 1 : -1;
          if (a.price < b.price) return order === 'asc' ? -1 : 1;
          return 0;
        })
    })
  )
  selectCategory(category: string): void {
    this._categorySubject.next(category);
  }
  sort(order:string){
    this._orderSubject.next(order);
  }

  constructor(private _categoriesService: CategoriesService, private _productsService: ProductsService, private _activatedRoute: ActivatedRoute) {
  }
}
