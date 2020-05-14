import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() {
  }

  public subErrorMsg: string;

  public setErrMsg(errMsg: string): void {
    this.subErrorMsg = errMsg;
  }

  public clearErrMsg(): void {
    this.subErrorMsg = '';
  }
}
