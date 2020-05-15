import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {RouterConstants} from '../../constants/router.constants';
import {AuthUserService} from '../services/auth-user.service';
import {UserService} from '../users/user-service/user.service';
import {UserEntity} from '../users/entity/user.entity';
import {Subscription} from 'rxjs';
import {AlertService} from '../services/alert.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent implements OnInit, OnDestroy {

  public maxLengthVarPassword = 70;
  public maxLengthVarName = 70;
  public loginForm: FormGroup;
  public user: UserEntity;
  private sub: Subscription = null;

  constructor(private route: Router, private authUserService: AuthUserService, private userService: UserService,
              public alertService: AlertService) {
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      name: new FormControl('', Validators.compose(
        [Validators.required, Validators.maxLength(this.maxLengthVarName)])),
      password: new FormControl('', Validators.compose(
        [Validators.required, Validators.maxLength(this.maxLengthVarPassword)]))
    });
  }

  login() {
    this.sub = this.userService.getUserTokenFromBackend(this.loginForm.value.name, this.loginForm.value.password).subscribe((response) => {
      localStorage.setItem('usertoken', response.headers.get('Authorization'));
      console.log('Token received from backend' + response.headers.get('Authorization'));
      console.log('getting now User object');
      this.userService.getUserData(this.loginForm.value.name, this.loginForm.value.password).subscribe(user => {
        this.user = user;
        if (this.user) {
          this.authUserService.setToken();
          this.route.navigateByUrl(RouterConstants.BASE_URL);
        } else {
          console.log('User is empty');
        }
      }, error => {
        console.log('An error returning data from backend' + error);
      });
    });
  }

  register() {
    this.route.navigateByUrl('register');
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
    this.alertService.clearErrMsg();
  }
}
