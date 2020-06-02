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
    console.log('setting up alert message to: ' + this.subErrorMsg);
  }

  public clearErrMsg(): void {
    this.subErrorMsg = '';
    console.log('alert message cleared');
  }
}
