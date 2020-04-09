import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {RouterConstants} from '../../constants/router.constants';
import {AuthUserService} from '../services/auth-user.service';
import {UserService} from '../users/user-service/user.service';
import {UserEntity} from '../users/entity/user.entity';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent implements OnInit, OnDestroy {

  public maxLengthVarContent = 50;
  public maxLengthVarName = 50;
  public loginForm: FormGroup;
  public user: UserEntity;
  private registered: boolean;
  public showMsg = false;
  public errorLoginMsg = 'Špatné přihlašovací údaje';
  private sub: Subscription = null;

  constructor(private route: Router, private authUserService: AuthUserService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      name: new FormControl('', Validators.compose(
        [Validators.required, Validators.maxLength(this.maxLengthVarName)])),
      password: new FormControl('', Validators.compose(
        [Validators.required, Validators.maxLength(this.maxLengthVarContent)]))
    });
  }

  login() {
    console.log(this.loginForm.value);
    this.sub = this.userService.getUserByUsername((this.loginForm.value.name)).subscribe((user) => {
      this.user = user;
      if (this.user && this.user.password === this.loginForm.value.password) {
        this.registered = true;
        this.authUserService.setToken();
        this.route.navigateByUrl(RouterConstants.BASE_URL);
      } else {
        this.registered = false;
      }
    }, error => {
      console.log('An error returning data from backend' + error);
      this.showMsg = true;
    });
  }

  register() {
    this.route.navigateByUrl('register');
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
