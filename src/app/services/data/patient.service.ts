import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private baseUrl = 'http://localhost:8080/patients'
  private projectUrl = 'http://localhost:8080/projects'
  private statuesUrl = 'http://localhost:8080/patientStatues'
  private voucherDetails = 'http://localhost:8080/voucherDetails'


  constructor(private http: HttpClient) { }

  /**
   *  @PostMapping("pId/{projectId}/docId/{doctorId}/vId/{voucherId}/pS/{patientStatuesId}")
   * @param patient
   * @param projectId
   * @param doctorId
   * @param voucherId
   * @param patientStatuesId
   */
  createPatient(patient: Object,
     projectId: number,
     doctorId: number,
     voucherId:number,
     patientStatuesId:number): Observable<Object> {
    return this.http.post(`${this.baseUrl}/pId/${projectId}/docId/${doctorId}/vId/${voucherId}/pS/${patientStatuesId}`, patient);
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

  getProjects(): Observable<any> {
    return this.http.get(`${this.projectUrl}`);
  }

  getStatues(): Observable<any> {
    return this.http.get(`${this.statuesUrl}`);
  }

  getVouchers(): Observable<any> {
    return this.http.get(`${this.voucherDetails}`);
  }

}
