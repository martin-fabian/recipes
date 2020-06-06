import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {BsModalService} from 'ngx-bootstrap/modal';
import {Router} from '@angular/router';
import {MessagesConstants} from '../../constants/messages.constants';
import {RouterConstants} from '../../constants/router.constants';
import {ModalMessageService} from '../services/modal-message.service';
import {ButtonActionEnum} from '../../constants/button-action.enum';
import {Subscription} from 'rxjs';
import {UserService} from '../users/user-service/user.service';
import {AlertService} from '../services/alert.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit, OnDestroy {

  public MessagesConstants = MessagesConstants;
  public ButtonActionEnum = ButtonActionEnum;
  public maxLengthVarName = 50;
  public registerForm: FormGroup;
  private subscription: Subscription[] = [];

  constructor(private modalService: BsModalService, private route: Router, private userService: UserService,
              private modalMessageService: ModalMessageService, public alertService: AlertService, private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.alertService.clearMsg();
    this.registerForm = new FormGroup({
      name: new FormControl('', Validators.compose(
        [Validators.required, Validators.maxLength(this.maxLengthVarName)])),
      password: new FormControl('', Validators.compose(
        [Validators.required, Validators.maxLength(this.maxLengthVarName)])),
      email: new FormControl('', Validators.compose(
        [Validators.required, Validators.maxLength(this.maxLengthVarName), Validators.email]))
    });
    this.subscription.push(this.modalMessageService.onRegisterSubscriptionModalWindow.subscribe(
      () => this.register()));
    this.subscription.push(this.modalMessageService.onResetSubscriptionModalWindow.subscribe(
      () => this.decline()));
  }

  ngOnDestroy(): void {
    this.subscription.forEach((subs) => subs.unsubscribe());
    this.alertService.clearMsg();
  }

  openSharedModal(typeOfAction: ButtonActionEnum, messageTitleModal: MessagesConstants) {
    this.modalMessageService.triggerOpenModalWindow(typeOfAction, messageTitleModal);
  }

  register(): void {
    this.spinner.show();
    this.alertService.clearMsg();
    console.log(this.registerForm.value);
    this.userService.registerUser(this.registerForm.value).subscribe(
      user => {
        console.log('user saved' + user);
        this.spinner.hide();
        this.alertService.setMsg('Registrace proběhla úspěšně, můžete se přihlásit.', 'INFO');
        setTimeout(() => {
          this.route.navigateByUrl(RouterConstants.BASE_URL);
        }, 5000);
      }
      , error => {
        console.log('error occured' + error);
        this.spinner.hide();
        this.alertService.setMsg(error, 'CHYBA');
      },
      () => console.log('completed'));
    /* http call to backend with body of FormData within formData */

  }

  decline(): void {
    this.registerForm.reset('', {onlySelf: true});
  }

}

