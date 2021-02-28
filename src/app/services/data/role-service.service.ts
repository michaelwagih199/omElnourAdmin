import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  
  private baseUrl = 'http://localhost:8080/api/roles'
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': sessionStorage.getItem('token')
    })
  }

  getAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}`,this.httpOptions);
  }


  delete(id):Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }


}
