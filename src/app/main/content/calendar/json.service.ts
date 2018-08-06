import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { TimeSlots } from './TimeSlots';




@Injectable()
export class JsonService {
    constructor(private http: HttpClient) { }

    getJson():Observable<TimeSlots> {
        return this.http.get("./assets/events.json").map(function(res){
            return <TimeSlots> res;
        });
    }
}

