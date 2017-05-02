import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import 'rxjs/add/operator/toPromise';
import { OfficeLocation } from './office-location.model';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class OfficeLocationService {
    private officeLocationsUrl = '/api/officelocations';
    constructor(private http:Http) {}

    getOfficeLocation(): Observable<OfficeLocation[]>{
        return this.http.get(this.officeLocationsUrl)
                        .map(response => response.json() as OfficeLocation[]);
    }
}