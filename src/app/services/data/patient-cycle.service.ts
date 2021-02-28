import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientCycleService {
  private baseUrl = 'http://localhost:8080/api/patientCycle'
  private basePationtUrl = 'http://localhost:8080/patients'

  constructor(private http: HttpClient) { }

  countCompleteCycle(patientId:number):Observable<any> {
    return this.http.get(`${this.baseUrl}/countComplete/${patientId}`);
  }

  countCurrentCycle(patientId:number):Observable<any> {
    return this.http.get(`${this.baseUrl}/countCurrentCycle/${patientId}`);
  }

  getSpentAndRemaining(patientId:number):Observable<any> {
    return this.http.get(`${this.baseUrl}/spentAndRemaining/${patientId}`);
  }

  getListPatientCycleByPIBind(patientId:number):Observable<any> {
    return this.http.get(`${this.baseUrl}/cycleListByPatientId/${patientId}`);
  }


  createPatientCycle(patientId:number,patientCycle:any):Observable<any> {
    return this.http.post(`${this.baseUrl}/createCycle/${patientId}`,patientCycle);
  }

  activePation(patientId:number):Observable<any> {
    return this.http.put(`${this.basePationtUrl}/activePatient/${patientId}`,Object);
  }

}
