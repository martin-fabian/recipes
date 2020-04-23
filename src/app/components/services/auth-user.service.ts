import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {

  public subsTokenSetUp = new Subject<boolean>();

  constructor() {
  }

  public getToken(): string {
    return localStorage.getItem('usertoken');
  }

  public setToken() {
    this.subsTokenSetUp.next(true);
  }

}
