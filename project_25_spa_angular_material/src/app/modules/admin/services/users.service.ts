import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

const urlUsers = '/api/v1.0/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getUsers() {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
  //    'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    });
    return this.http.get(urlUsers, {
      headers,
      observe: 'response',
      responseType: 'json'
    });
  }
}
