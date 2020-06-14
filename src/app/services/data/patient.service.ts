import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient } from '../models/Patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private baseUrl = 'http://localhost:8080/patients'

  constructor(private http: HttpClient) { }

  createPatient(patient: Object, goverId: number): Observable<Object> {
    return this.http.post(`${this.baseUrl}/${goverId}`, patient);
  }

  getAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  update(id, doctor: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, doctor);
  }

  delete(id): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

}
