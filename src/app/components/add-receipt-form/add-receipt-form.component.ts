import {Component, OnInit, TemplateRef} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {BsModalService, BsModalRef} from 'ngx-bootstrap/modal';
import {Router} from '@angular/router';
import {ReceiptService} from '../receipts/receipt-service/receipt.service';
import {MessagesConstants} from '../../constants/messages.constants';
import {RouterConstants} from '../../constants/router.constants';
import {ModalMessageService} from '../services/modal-message.service';
import {ButtonActionEnum} from '../../constants/button-action.enum';

@Component({
  selector: 'app-add-receipt-form',
  templateUrl: './add-receipt-form.component.html',
  styleUrls: ['./add-receipt-form.component.scss']
})

export class AddReceiptFormComponent implements OnInit {

  private modalRef: BsModalRef;
  public MessagesConstants = MessagesConstants;
  public ButtonActionEnum = ButtonActionEnum;
  public maxLengthVarContent = 3000;
  public maxLengthVarName = 50;
  public addNewReceiptForm: FormGroup;
  public filename = 'Vložit obrázek';
  public imageBase64: string;
  public alertMaxSize = false;
  public alertImageType = false;
  private formData: FormData;

  constructor(private modalService: BsModalService, private route: Router, private receipService: ReceiptService,
              private modalMessageService: ModalMessageService) {
  }

  ngOnInit(): void {
    this.formData = new FormData();
    this.addNewReceiptForm = new FormGroup({
      name: new FormControl('', Validators.compose(
        [Validators.required, Validators.maxLength(this.maxLengthVarName)])),
      category: new FormControl(''),
      image: new FormControl(''),
      content: new FormControl('', Validators.compose(
        [Validators.required, Validators.maxLength(this.maxLengthVarContent)]))
    });
    this.modalMessageService.onConfirmSubscriptionModalWindow.subscribe(() => this.confirm());
    this.modalMessageService.onResetSubscriptionModalWindow.subscribe(() => this.decline());
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-md'});
    if (this.modalMessageService.onConfirmSubscriptionModalWindow) {
      this.confirm();
    }
  }

  openSharedModal(typeOfAction: ButtonActionEnum, messageTitleModal: MessagesConstants) {
    this.modalMessageService.triggerOpenModalWindow(typeOfAction, messageTitleModal);
  }

  confirm(): void {
    console.log(this.addNewReceiptForm.value);
    console.log(this.toFormDataTransform(this.addNewReceiptForm.value));
    /* http call to backend with body of FormData within formData */
    this.route.navigateByUrl(RouterConstants.BASE_URL);
  }

  toFormDataTransform<T>(formValue: T) {
    for (const key of Object.keys(formValue)) {
      const value = formValue[key];
      this.formData.append(key, value);
    }
    return this.formData;
  }

  decline(): void {
    this.imageBase64 = null;
    this.filename = 'Vložit obrázek';
    this.addNewReceiptForm.reset('', {onlySelf: true});
  }


  onSelectFile(event) { // called each time file input changes
    const file = event.target.files;
    this.filename = file[0].name;
    if (file && file[0]) {
      const mimeType = file[0].type;
      if (mimeType.match(/image\/*/) == null) {
        this.alertImageType = true;
        return false;
      }
      const maxSize = 20971520;
      if (file[0].size > maxSize) {
        this.alertMaxSize = true;
        return false;
      }
      const fileReader = new FileReader();
      fileReader.onload = (e: any) => {
        this.imageBase64 = e.target.result;
        // this.addNewReceiptForm.patchValue({image: e.target.result});
      };
      fileReader.readAsDataURL(file[0]);
    } else {
      prompt(MessagesConstants.UPLOAD_IMG_FAILED);
      console.log('Failed to load img.');
      return false;
    }
  }

  showDelMsg() {
    console.log('Vymazat....');
  }

}

