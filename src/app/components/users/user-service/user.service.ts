import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {error} from '@angular/compiler/src/util';
import {RouterConstants} from '../../../constants/router.constants';
import {UserEntity} from '../entity/user.entity';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public user: UserEntity;
  private headers;

  constructor(private http: HttpClient) {
  }

  getUserByUsername(username: string, password: string): Observable<UserEntity> {
    this.createBasicAuthHeader();
    return this.http.get<UserEntity>(`${RouterConstants.USERS_BACKEND_BASE_URL}/login/${username}/${password}`,
      {headers: this.headers}).pipe(
      tap(data => {
        console.log(`fetched data from backend`);
        localStorage.setItem('username', data.name);
        this.user = data;
      }),
      catchError((_) => error(`error fetching data from backend`)));
  }

  // getUserByUsername(username: string, password: string): Observable<UserEntity> {
  //   this.createBasicAuthHeader();
  //   return this.http.get<UserEntity>(`${RouterConstants.USERS_BACKEND_BASE_URL}/findByUsername/${username}`,
  //     {headers: this.headers}).pipe(
  //     tap(data => {
  //       console.log(`fetched data from backend`);
  //       localStorage.setItem('username', data.name);
  //       this.user = data;
  //     }),
  //     catchError((_) => error(`error fetching data from backend`)));
  // }

  createBasicAuthHeader() {
    const username = 'user';
    const password = 'password';
    this.headers = new HttpHeaders({
      Authorization: 'Basic ' + window.btoa(username + ':' + password)
    });
  }

  registerUser(user): Observable<UserEntity> {
    this.createBasicAuthHeader();
    user.id = Math.random() * 65531;
    user.created = new Date();
    return this.http.post<UserEntity>(RouterConstants.USERS_BACKEND_BASE_URL + '/register', user,
      {headers: this.headers}).pipe(
      tap((rec: UserEntity) => console.log(`added user w/ id=${rec.id}`)),
      catchError(() => error('error saving user data to backend')));
  }

}

