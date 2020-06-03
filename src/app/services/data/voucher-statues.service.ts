import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoucherStatuesService {

  private baseUrl = 'http://localhost:8080/voucherStatues'

  constructor(private http: HttpClient) { }

  getAll():Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getById (id:number):Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  create(doctor: Object): Observable<Object>  {
    return this.http.post( `${this.baseUrl}` , doctor);
  }

  update(id, doctor: any): Observable <Object> {
    return this.http.put(`${this.baseUrl}/${id}`, doctor);
  }

  delete(id):Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }


}
