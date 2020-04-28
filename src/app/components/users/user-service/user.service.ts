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

  constructor(private http: HttpClient) {
  }

  getUserTokenFromBackend(username: string, password: string): Observable<any> {
    return this.http.get<UserEntity>(`${RouterConstants.LOCAL_BACKEND_8080}/login?username=${username}&password=${password}`,
      {observe: 'response'});
  }

  getUserData(username: string, password: string): Observable<UserEntity> {
    return this.http.get<UserEntity>(`${RouterConstants.LOCAL_BACKEND_8080}/users/loginAfterAuth?username=${username}&password=${password}`,
      {
        headers: new HttpHeaders({
          Authorization: localStorage.getItem('usertoken')
        })

      }).pipe(tap(user => {
      this.user = user;
      localStorage.setItem('username', user.name);
    }));
  }

  registerUser(user): Observable<UserEntity> {
    user.id = Math.random() * 65531;
    user.created = new Date();
    return this.http.post<UserEntity>(RouterConstants.LOCAL_BACKEND_8080 + '/users/register', user
    ).pipe(
      tap((rec: UserEntity) => console.log(`added user w / id =${rec.id}`)),
      catchError(() => error('error saving user data to backend')));
  }
}

