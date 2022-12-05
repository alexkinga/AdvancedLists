import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FilteredProductListComponent} from './components/filtered-product-list/filtered-product-list.component';
import {SortedProductListComponent} from './components/sorted-product-list/sorted-product-list.component';
import {FilteredEmployeeListComponent} from './components/filtered-employee-list/filtered-employee-list.component';
import {
  FilteredProductListComponentModule
} from './components/filtered-product-list/filtered-product-list.component-module';
import {CategoriesServiceModule} from './services/categories.service-module';
import {ProductsServiceModule} from './services/products.service-module';
import {SortedProductListComponentModule} from './components/sorted-product-list/sorted-product-list.component-module';
import {
  FilteredEmployeeListComponentModule
} from './components/filtered-employee-list/filtered-employee-list.component-module';
import {EmployeeServiceModule} from './services/employee.service-module';

@NgModule({
  imports: [RouterModule.forRoot([{path: 'products', component: FilteredProductListComponent}, {
    path: 'products-sort',
    component: SortedProductListComponent
  }, {
    path: 'employee-filter',
    component: FilteredEmployeeListComponent
  }]), FilteredProductListComponentModule, CategoriesServiceModule, ProductsServiceModule, SortedProductListComponentModule, FilteredEmployeeListComponentModule, EmployeeServiceModule],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
