import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, combineLatest, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
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

  private _rangeSubject: BehaviorSubject<Age> = new BehaviorSubject<Age>({ min: 0, max: 100 });
  age$: Observable<Age[]> = of([{ min: 0, max: 20 }, { min: 21, max: 30 }, { min: 31, max: 40 }, { min: 41, max: 50 }, { min: 51, max: 100 }]);
  public range$: Observable<Age> = this._rangeSubject.asObservable();

  readonly employees$: Observable<EmployeeModel[]> = combineLatest([
    this._employeeService.getAll(),
    this.range$
  ]).pipe(
    map(([employees, age]: [EmployeeModel[], Age]) => {
      return employees.filter(employee => employee.age > age.min && employee.age < age.max);
    })
  );

  constructor(private _employeeService: EmployeeService, private _activatedRoute: ActivatedRoute) {
  }

  getAge(min: number, max: number) {
    this._rangeSubject.next({ max: max, min: min });
  }
}
