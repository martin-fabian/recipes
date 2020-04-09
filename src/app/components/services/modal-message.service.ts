import {Injectable, OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';
import {ButtonActionEnum} from '../../constants/button-action.enum';
import {MessagesConstants} from '../../constants/messages.constants';

@Injectable({
  providedIn: 'root'
})
export class ModalMessageService implements OnDestroy {

  subscriptionModalWindow = new Subject<any>();
  onConfirmSubscriptionModalWindow = new Subject<boolean>();
  onResetSubscriptionModalWindow = new Subject<boolean>();
  onDeleteSubscriptionModalWindow = new Subject<boolean>();
  onModifySubscriptionModalWindow = new Subject<boolean>();
  onRegisterSubscriptionModalWindow = new Subject<boolean>();

  ngOnDestroy(): void {
    this.onConfirmSubscriptionModalWindow.unsubscribe();
    this.subscriptionModalWindow.unsubscribe();
    this.onResetSubscriptionModalWindow.unsubscribe();
    this.onDeleteSubscriptionModalWindow.unsubscribe();
    this.onRegisterSubscriptionModalWindow.unsubscribe();
  }

  triggerOpenModalWindow(typeOfAction: ButtonActionEnum, messageTitleModal: MessagesConstants) {
    this.subscriptionModalWindow.next({
      typeOfAction,
      messageTitleModal
    });
  }

  onConfirmModalAction() {
    this.onConfirmSubscriptionModalWindow.next(true);
  }

  onResetModalAction() {
    this.onResetSubscriptionModalWindow.next(true);
  }

  onDeleteModalAction() {
    this.onDeleteSubscriptionModalWindow.next(true);
  }

  onModifyModalAction() {
    this.onModifySubscriptionModalWindow.next(true);
  }

  onRegisterModalAction() {
    this.onRegisterSubscriptionModalWindow.next(true);
  }
}
