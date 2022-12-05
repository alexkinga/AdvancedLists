import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {BehaviorSubject, Observable, combineLatest, of, switchMap} from 'rxjs';
import { map } from 'rxjs/operators';
import { EmployeeModel } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';

interface Age {
  min: number,
  max: number
}

@Component({
  selector: 'app-filtered-employee-list',
  templateUrl: './filtered-employee-list.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilteredEmployeeListComponent {
  private _orderSubject: BehaviorSubject<string> = new BehaviorSubject<string>('asc');
  private _rangeSubject: BehaviorSubject<Age> = new BehaviorSubject<Age>({ min: 0, max: 100 });

  age$: Observable<Age[]> = of([{ min: 0, max: 20 }, { min: 21, max: 30 }, { min: 31, max: 40 }, { min: 41, max: 50 }, { min: 51, max: 100 }]);

  readonly employees$: Observable<EmployeeModel[]> = combineLatest([
    this._orderSubject.asObservable(),
    this._rangeSubject.asObservable()
  ]).pipe(
    switchMap(([order,age]) => this._employeeService.getAll().pipe(
      map((employee) => {
        return employee.sort((a,b) => {
          if(a.employee_salary > b.employee_salary) return order === 'asc' ? 1 : -1;
          if(a.employee_salary < b.employee_salary) return order === 'desc' ? -1 : 1;
          return 0;
        })
      }),
      map((employees) => {
        return employees.filter((employee) => employee.employee_age > age.min && employee.employee_age < age.max)
      })
    ))
  );

  constructor(private _employeeService: EmployeeService, private _activatedRoute: ActivatedRoute) {
  }

  getAge(min: number, max: number) {
    this._rangeSubject.next({ max: max, min: min });
  }

  sort(order:string) : void{
    this._orderSubject.next(order);
  }
}
