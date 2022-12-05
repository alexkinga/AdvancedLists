import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, take} from 'rxjs';
import {EmployeeModel} from '../models/employee.model';
import {ApiResponse} from "./api.response";
import {map} from "rxjs/operators";
import {EmployeeResponse} from "./employee.response";

@Injectable()
export class EmployeeService {

  constructor(private _httpClient: HttpClient) {
  }

  getAll(): Observable<EmployeeModel[]> {
    return this._httpClient.get<ApiResponse<EmployeeResponse[]>>('https://dummy.restapiexample.com/api/v1/employees').pipe(
      take(1),
      map((response) => {
        return response.data.map((employeeResponse) => {
          return {
            employee_name : employeeResponse.employee_name,
            employee_salary : employeeResponse.employee_salary,
            employee_age : employeeResponse.employee_age,
            profile_image : employeeResponse.profile_image,
            id: employeeResponse.id
          }
        });
      }));
  }
}
