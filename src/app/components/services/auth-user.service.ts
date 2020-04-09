import {Injectable, OnDestroy} from '@angular/core';
import * as uuid from 'uuid';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthUserService implements OnDestroy {

  public subsTokenSetUp = new Subject<boolean>();

  constructor() {
  }

  token: string = null;

  public getToken(): string {
    return localStorage.getItem('usertoken');
  }

  public setToken() {
    this.generateToken();
    localStorage.setItem('usertoken', this.token);
    this.subsTokenSetUp.next(true);
  }

  private generateToken(): string {
    return this.token = uuid.v4();
  }

  ngOnDestroy(): void {
  }

}
