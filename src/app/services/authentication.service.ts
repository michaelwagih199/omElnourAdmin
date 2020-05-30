import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


export class User {
  constructor(public status: string,) { }
}

export class JwtResponse {
  constructor( public jwttoken: string,) { }
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(
    private httpClient: HttpClient
  ) {
  }
  authenticate(userName, password) {
    return this.httpClient.post<any>('http://localhost:8080/authenticateAPI', { userName, password }).pipe(
      map(
        userData => {
          if (userData.token != null) {
            sessionStorage.setItem('username', userName);
            let tokenStr = 'Bearer ' + userData.token;
            sessionStorage.setItem('token', tokenStr);
            return userData;
          }
        }
      )
    );
  }
  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    //console.log(!(user === null))
    return !(user === null)
  }
  logOut() {
    sessionStorage.removeItem('username')
    sessionStorage.removeItem('token')
  }
}
