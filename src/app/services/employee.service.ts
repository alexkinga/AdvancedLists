import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, take} from 'rxjs';
import {EmployeeModel} from '../models/employee.model';
import {ApiResponse} from "./api.response";
import {map} from "rxjs/operators";

@Injectable()
export class EmployeeService {
  constructor(private _httpClient: HttpClient) {
  }

  getAll(): Observable<EmployeeModel[]> {
    return this._httpClient.get<ApiResponse<EmployeeModel[]>>('https://dummy.restapiexample.com/api/v1/employees').pipe(
      take(1),
      map((response) => {
        return response.data.map((employeeResponse) => {
          return {
            name: employeeResponse.name,
            salary: employeeResponse.salary,
            age: employeeResponse.age,
            image: employeeResponse.image,
            id: employeeResponse.id
          }
        })
      })
    )
  }
}
