import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  api = environment.apiBaseURL;

  constructor(private http: HttpClient) {
  }

  isUserHasAccess(getAccessDetails = false): Observable<boolean | any[]> {
    // console.log('isUserHasAccess detected');
    return new Observable<boolean>(subscriber => {
      this.http.get(`${this.api}/users`, {observe: 'response', responseType: 'json'})
        .subscribe(response => {
          if (response?.ok) {
            // @ts-ignore
            subscriber.next(true);
            subscriber.complete();
            return;
          } else {
            subscriber.next(false);
            subscriber.complete();
            return;
          }
        }, error => {
          subscriber.next(false);
          subscriber.complete();
          return;
        });
    });
  }

  signin(login: string, password: string): Observable<boolean> {
    const body = {username: login, password};
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return new Observable<boolean>(subscriber => {
      this.http.post(`${this.api}/auth/signin`, JSON.stringify(body), {
        headers,
        observe: 'response',
        responseType: 'json'
      }).subscribe(response => {
        if (response?.ok) {
          // @ts-ignore
          localStorage.setItem('jwt', response?.body.access_token);
          subscriber.next(true);
          subscriber.complete();
        } else {
          subscriber.next(false);
          subscriber.complete();
        }
      }, error => {
        subscriber.next(false);
        subscriber.complete();
      })
    });
  }

  signup(login: string, password: string): Observable<boolean> {
    const body = {login, descr: `The user with login ${login}`, password};
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return new Observable<boolean>(subscriber => {
      this.http.post(`${this.api}/auth/signup`, JSON.stringify(body), {
        headers,
        observe: 'response',
        responseType: 'json'
      }).subscribe(response => {
        subscriber.next(true);
        subscriber.complete();
      }, error => {
        subscriber.next(false);
        subscriber.complete();
      })
    });
  }

}
