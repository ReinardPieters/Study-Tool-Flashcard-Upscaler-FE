import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginCredentials } from '../models/login-credentials';
import { UserDto } from '../models/user-dto'


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private router: Router) {
    // This service can now make HTTP requests via `this.http`.
  }

  private baseUrl = 'http://localhost:5013/api/'

  login(credentials: LoginCredentials): Observable<UserDto> {
    return this.http.post<UserDto>('http://localhost:5013/api/Login/login', credentials);
  }

}
