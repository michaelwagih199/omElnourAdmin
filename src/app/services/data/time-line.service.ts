import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimeLineService {
  private baseUrl = 'http://localhost:8080/api/patientTimeLine'

  constructor(private http: HttpClient) { }

  getAll():Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

}
