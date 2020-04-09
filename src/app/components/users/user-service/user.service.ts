import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {error} from '@angular/compiler/src/util';
import {RouterConstants} from '../../../constants/router.constants';
import {UserEntity} from '../entity/user.entity';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getUserByUsername(username: string): Observable<UserEntity> {
    return this.http.get<UserEntity>(`${RouterConstants.USERS_BACKEND_BASE_URL}/findByUsername/${username}`).pipe(
      tap(_ => console.log(`fetched data from backend`)),
      catchError((_) => error(`error fetching data from backend`)));
  }
  registerUser(user): Observable<UserEntity> {
    /* TO DO create userService to get actual username from localstorage */
    user.id = Math.random() * 65531;
    user.created = new Date();
    console.log('generated user id is ' + user.id + ' and created time is ' + user.created);
    return this.http.post<UserEntity>(RouterConstants.USERS_BACKEND_BASE_URL + '/register', user).pipe(
      tap((rec: UserEntity) => console.log(`added user w/ id=${rec.id}`)),
      catchError(() => error('error saving user data to backend')));
  }

}

