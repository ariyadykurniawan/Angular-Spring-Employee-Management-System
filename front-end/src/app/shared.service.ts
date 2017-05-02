import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SharedService {
    private notify = new Subject<any>();
    notifyObservable$ = this.notify.asObservable();

    constructor() { }

    public notifyOther(data: any) {
        if (data) {
            this.notify.next(data);
        }
    }
}