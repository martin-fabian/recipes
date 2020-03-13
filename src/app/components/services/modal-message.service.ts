import {Injectable, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {ButtonActionEnum} from "../../constants/button-action.enum";
import {MessagesConstants} from "../../constants/messages.constants";

@Injectable({
  providedIn: 'root'
})
export class ModalMessageService implements OnInit, OnDestroy {

  subscriptionModalWindow = new Subject<any>();
  onConfirmSubscriptionModalWindow = new Subject<boolean>();
  onResetSubscriptionModalWindow = new Subject<boolean>();

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.onConfirmSubscriptionModalWindow.unsubscribe();
    this.subscriptionModalWindow.unsubscribe();
    this.onResetSubscriptionModalWindow.unsubscribe();
  }


  triggerOpenModalWindow(typeOfAction: ButtonActionEnum, messageTitleModal: MessagesConstants) {
    this.subscriptionModalWindow.next({
      typeOfAction: typeOfAction,
      messageTitleModal: messageTitleModal
    });
  }

  onConfirmModalAction() {
    this.onConfirmSubscriptionModalWindow.next(true);
  }

  onResetModalAction() {
    this.onResetSubscriptionModalWindow.next(true);
  }
}
