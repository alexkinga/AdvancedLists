import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { FlexModule } from '@angular/flex-layout/flex';
import { FilteredEmployeeListComponent } from './filtered-employee-list.component';

@NgModule({
  imports: [MatCardModule, MatListModule, FlexModule, CommonModule],
  declarations: [FilteredEmployeeListComponent],
  providers: [],
  exports: [FilteredEmployeeListComponent]
})
export class FilteredEmployeeListComponentModule {
}
