import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class User_service {
  private baseUrl = 'http://localhost:8080/api/users'
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': sessionStorage.getItem('token')
    })
  }
  getAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}`,this.httpOptions);
  }

}
