import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoucherOrderServiceService {
  private baseUrl = 'http://localhost:8080/voucherOrders'

  constructor(private http: HttpClient) { }

  getAll():Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getById (id:number):Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  /**
   * custom create
   * @param doctor
   */
  createObject(goverId,doctorId,statuesId,doctor: Object): Observable<Object>  {
    return this.http.post( `${this.baseUrl}/gId/${goverId}/docId/${doctorId}/vsId/${statuesId}` , doctor);
  }

  update(id, doctor: any): Observable <Object> {
    return this.http.put(`${this.baseUrl}/${id}`, doctor);
  }

  delete(id):Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  findByTitle(title) {
    return this.http.get(`${this.baseUrl}?title=${title}`);
  }

  filterByDate (date:string):Observable<any> {
    return this.http.get(`${this.baseUrl}/date/${date}`);
  }

  filterByDoctorName (name:string):Observable<any> {
    return this.http.get(`${this.baseUrl}/doctorName/${name}`);
  }


}
