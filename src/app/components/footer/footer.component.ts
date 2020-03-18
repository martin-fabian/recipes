import {Component} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})

export class FooterComponent {
  public dateTime: Date;

  constructor() {
    setInterval(() => {
      this.dateTime = new Date();
    }, 1);
  }
}
