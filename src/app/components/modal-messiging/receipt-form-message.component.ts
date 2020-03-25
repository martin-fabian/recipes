import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {Router} from '@angular/router';
import {RouterConstants} from '../../constants/router.constants';
import {ModalMessageService} from '../services/modal-message.service';
import {ButtonActionEnum} from '../../constants/button-action.enum';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-receipt-form-message',
  templateUrl: './receipt-form-message.component.html'
})
export class ReceiptFormMessageComponent implements OnInit, OnDestroy {

  private modalRef: BsModalRef;
  @Input() showMsgInput: string;
  @Input() showBtnMsgModal: string;
  @ViewChild('template', {static: true}) input: ElementRef;
  public ButtonActionEnum = ButtonActionEnum;
  public typeOfAction: string;
  private subscription: Subscription;

  ngOnInit(): void {
    this.subscription = this.modalMessageService.subscriptionModalWindow.subscribe(data => {
      console.log('data z subscribe ' + data);
      this.openModal(data);
    });
  }

  constructor(private modalService: BsModalService, private route: Router, private modalMessageService: ModalMessageService) {
  }

  openModal(data) {
    this.showMsgInput = data.messageTitleModal;
    this.typeOfAction = data.typeOfAction;
    this.modalRef = this.modalService.show(this.input, {class: 'modal-md'});
  }

  confirm(): void {
    this.modalRef.hide();
    this.modalMessageService.onConfirmModalAction();
    this.route.navigateByUrl(RouterConstants.BASE_URL);
  }

  decline(): void {
    this.modalRef.hide();
  }

  confirmReset() {
    this.modalRef.hide();
    this.modalMessageService.onResetModalAction();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
