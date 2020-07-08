import {RouterConstants} from '../../constants/router.constants';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedComponent {


  constructor(private route: Router) {
  }

  timeDelay() {
    setTimeout(() => {
      this.route.navigateByUrl(RouterConstants.BASE_URL);
    }, 5000);
  }

}



