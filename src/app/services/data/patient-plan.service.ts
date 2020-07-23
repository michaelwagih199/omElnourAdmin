import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientPlanService {
  private baseUrl = 'http://localhost:8080/api/patientPlan'

  constructor(private http: HttpClient) { }

  createPatientPlanNode(patientCycleId:number):Observable<any> {
    return this.http.post(`${this.baseUrl}/createPlan/${patientCycleId}`,null);
  }

  getPatientPlanByIdBind(cycleId:number):Observable<any> {
    return this.http.get(`${this.baseUrl}/planByCycleId/${cycleId}`);
  }

}
