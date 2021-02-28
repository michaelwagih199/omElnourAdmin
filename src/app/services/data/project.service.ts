import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private baseUrl = 'http://localhost:8080/api/projects'

  constructor(private http: HttpClient) { }

  getAll():Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }


  update(id, doctor: any): Observable <Object> {
    return this.http.put(`${this.baseUrl}/UpdateProject/${id}`, doctor);
  }

}
