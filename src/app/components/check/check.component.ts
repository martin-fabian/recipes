import {Component, OnDestroy, OnInit} from '@angular/core';
import {NetCheckService} from '../services/net-check.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.scss']
})
export class CheckComponent implements OnInit, OnDestroy {
  private timerId;
  public url: string;
  public statusOk: string;

  constructor(private netCheckService: NetCheckService) {
  }

  ngOnInit(): void {
    this.url = 'www.google.com';
    this.statusOk = null;
  }

  ngOnDestroy(): void {
    clearInterval(this.timerId);
  }

  onCheckInternetUrl(url?: string): void {
    this.offCheckInternetUrl();
    console.log('url z inputu je: ' + url);
    this.timerId = setInterval(() => {
      this.netCheckService.checkInternetConnectionUrl(url).pipe(first()).subscribe((resp) => {
        console.log(resp);
        console.log(resp.status);
        // tslint:disable-next-line:triple-equals
        if (resp.status == '200') {
          this.statusOk = 'OK';
          console.log('online');
        } else {
          this.statusOk = 'BEZ INTERNETU!!!';
          console.log('offline');
        }
      }, error => {
        this.statusOk = 'BEZ INTERNETU!!!';
        console.log(error.message);
      });
    }, 5000);
  }

  offCheckInternetUrl(): void {
    clearInterval(this.timerId);
    this.statusOk = null;
  }

}
