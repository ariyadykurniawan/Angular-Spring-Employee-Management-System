import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import 'rxjs/add/operator/toPromise';
import { Employee } from './employee.model';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class EmployeeService {
    private employeesUrl = '/api/employees';

    constructor(private http:Http) {}

    getEmployees(): Observable<Employee[]>{
        return this.http.get(this.employeesUrl)
                        .map(response => response.json() as Employee[]);
    }

    getEmployee(empId: number): Observable<Employee>{
        const url = `${this.employeesUrl}/${empId}`;
        return this.http.get(url)
            .map(response => response.json() as Employee);
    }

    updateEmployee(employee): Observable<string>{
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let urlPut = `${this.employeesUrl}/${employee.empId}`;
        // console.log(employee);
        return this.http
                    .put(urlPut, JSON.stringify(employee), {headers: headers})
                    .map(response => response.json());
    }
    
    createEmployee(employee): Observable<string>{
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.employeesUrl, JSON.stringify(employee), options)
                        .map(response => response.json());
    }

    deleteEmployee(empId: number): Observable<string>{
        const url = `${this.employeesUrl}/${empId}`;
        return this.http.delete(url)
                    .map(response => response.json());
    }
}