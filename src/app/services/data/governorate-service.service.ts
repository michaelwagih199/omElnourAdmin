import { Injectable } from '@angular/core';
import { Governorate } from '../models/governorate';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GovernorateServiceService {



  private MYFLIGHTS: Governorate[] = [

  ];

  constructor(private http: HttpClient) {

  }

  // to test with service api
  public getFlightsData(): Observable<Governorate[]> {
      let url ='http://localhost:8080/governorates';
    return this.http.get<Governorate[]>(url);
  }



}
