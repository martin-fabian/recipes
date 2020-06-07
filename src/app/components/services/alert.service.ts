import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  public subMsg: string;
  public title: string;

  constructor() {
  }

  public setMsg(msg: string, title?: string): void {
    this.subMsg = msg;
    if (title) {
      this.title = title;
    }
    console.log('setting up alert message to: ' + this.subMsg + ' and title to ' + this.title);
  }

  public clearMsg(): void {
    this.subMsg = '';
    console.log('alert message cleared');
  }
}
