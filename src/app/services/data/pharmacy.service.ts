import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class PharmacyService {

  private baseUrl = 'http://localhost:8080/pharmacies'

  constructor(private http: HttpClient) { }

  getAll():Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getPharmcyById (id:number):Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createPharmacy(pharmacy: Object,goverId:number): Observable<Object>  {
    return this.http.post(`${this.baseUrl}/${goverId}`, pharmacy);
  }

  update(id, pharmacy: any): Observable <Object> {
    return this.http.put(`${this.baseUrl}/${id}`, pharmacy);
  }

  delete(id):Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  deleteAll() {
    return this.http.delete(this.baseUrl);
  }

  findByTitle(title) {
    return this.http.get(`${this.baseUrl}?title=${title}`);
  }

  filterPharmcyByGoverId (goverId:number):Observable<any> {
    return this.http.get(`${this.baseUrl}/goverId/${goverId}`);
  }

  filterPharmcyByPharmacyCode (code:string):Observable<any> {
    return this.http.get(`${this.baseUrl}/code/${code}`);
  }

  filterPharmcyByPharmacyName (name:string):Observable<any> {
    return this.http.get(`${this.baseUrl}/name/${name}`);
  }

  getPharmacyCodes ():Observable<any> {
    return this.http.get(`${this.baseUrl}/codes`);
  }

  getPharmacyNames ():Observable<any> {
    return this.http.get(`${this.baseUrl}/names`);
  }


}
