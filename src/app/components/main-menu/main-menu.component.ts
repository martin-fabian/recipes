import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {AuthUserService} from '../services/auth-user.service';
import {Subscription} from 'rxjs';
import {UserService} from '../users/user-service/user.service';

@Component({
  selector: 'app-main-menu',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit, OnDestroy {

  public logged = false;
  private sub: Subscription;
  searchForm = new FormGroup({});

  constructor(private authService: AuthUserService, public userService: UserService) {
  }

  ngOnInit() {
    this.sub = this.authService.subsTokenSetUp.subscribe((val) => {
      if (val) {
        if (this.authService.getToken()) {
          this.logged = true;
        }
      } else {
        this.logged = false;
      }
    });

    this.logged = false;
  }

  clearToken() {
    if (this.logged) {
      localStorage.clear();
      this.authService.subsTokenSetUp.next(false);
      this.clearUserInMenu();
    }
  }

  clearUserInMenu() {
    this.userService.user = null;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
