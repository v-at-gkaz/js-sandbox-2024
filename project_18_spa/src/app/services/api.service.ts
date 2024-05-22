import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

const url = '/api/v1.0/auth/signin';
const urlUsers = '/api/v1.0/users';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  auth(username: string, password: string) {
    const headers = new HttpHeaders({
      'Content-type': 'application/json'
    });
    return this.http.post(url, {username, password}, {
      headers,
      observe: 'response',
      responseType: 'json'
    });
  }

  getUsers() {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    });
    return this.http.get(urlUsers, {
      headers,
      observe: 'response',
      responseType: 'json'
    });
  }

}
