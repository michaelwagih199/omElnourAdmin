import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SmsService {
  private baseUrl = 'http://localhost:8080/api/Sms'
  private smsApi = 'https://smssmartegypt.com/sms/api/'

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  sendSms(username,password,sendername,mobiles,message): Observable<Object> {
    const params = new HttpParams()
    .set('username', username)
    .set('password', password)
    .set('sendername', sendername)
    .set('mobiles', mobiles)
    .set('message', message);
    return this.http.get(`${this.smsApi}`,{params});
  }

  saveSms(oject: Object,patientId:any,smsTypeId:any): Observable<Object> {
    const params = new HttpParams()
      .set('patientId', patientId)
      .set('smsTypeId', smsTypeId);
    return this.http.post(`${this.baseUrl}/sendMessage`,oject,{params});
  }

  update(id, doctor: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, doctor);
  }

  delete(id): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  findByTitle(title) {
    return this.http.get(`${this.baseUrl}?title=${title}`);
  }

  filterByDoctorCode(code: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/code/${code}`);
  }

  filterByDoctorName(name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/name/${name}`);
  }

  getCodes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/codes`);
  }

  getNames(): Observable<any> {
    return this.http.get(`${this.baseUrl}/names`);
  }

}
