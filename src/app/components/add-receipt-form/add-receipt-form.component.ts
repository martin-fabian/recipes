import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {BsModalService, BsModalRef} from 'ngx-bootstrap/modal';
import {Router} from '@angular/router';
import {RecipeService} from '../receipts/recipe-service/recipe.service';
import {MessagesConstants} from '../../constants/messages.constants';
import {ModalMessageService} from '../services/modal-message.service';
import {ButtonActionEnum} from '../../constants/button-action.enum';
import {Subscription} from 'rxjs';
import {NgxSpinnerService} from 'ngx-spinner';
import {SharedComponent} from '../shared/shared.component';

@Component({
  selector: 'app-add-receipt-form',
  templateUrl: './add-receipt-form.component.html',
  styleUrls: ['./add-receipt-form.component.scss']
})

export class AddReceiptFormComponent implements OnInit, OnDestroy {

  private modalRef: BsModalRef;
  public MessagesConstants = MessagesConstants;
  public ButtonActionEnum = ButtonActionEnum;
  public maxLengthVarContent = 3000;
  public maxLengthVarName = 50;
  public addNewRecipeForm: FormGroup;
  public filename = 'Vložit obrázek';
  public imageBase64: string;
  public alertMaxSize = false;
  public alertImageType = false;
  private formData: FormData;
  private subscription: Subscription[] = [];
  public title;
  public messageAlert;
  public showAlert;

  constructor(private modalService: BsModalService, private route: Router, private receipService: RecipeService,
              private modalMessageService: ModalMessageService, private spinner: NgxSpinnerService,
              private sharedComponent: SharedComponent) {
  }

  ngOnInit(): void {
    this.showAlert = false;
    this.formData = new FormData();
    this.addNewRecipeForm = new FormGroup({
      name: new FormControl('', Validators.compose(
        [Validators.required, Validators.maxLength(this.maxLengthVarName)])),
      category: new FormControl(''),
      image: new FormControl('', Validators.maxLength(this.maxLengthVarName)),
      content: new FormControl('', Validators.compose(
        [Validators.required, Validators.maxLength(this.maxLengthVarContent)])),
      imageSource: new FormControl('')
    });
    this.subscription.push(this.modalMessageService.onConfirmSubscriptionModalWindow.subscribe(
      () => this.confirm()));
    this.subscription.push(this.modalMessageService.onResetSubscriptionModalWindow.subscribe(
      () => this.decline()));
  }

  ngOnDestroy(): void {
    this.subscription.forEach((subs) => subs.unsubscribe());
    this.messageAlert = '';
    this.title = '';
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
    this.spinner.show();
    console.log(this.addNewRecipeForm.value);
    this.receipService.saveRecipe(this.addNewRecipeForm.value).subscribe(
      recipe => {
        this.spinner.hide();
        console.log('recipes saved');
        this.showAlert = true;
        this.title = 'INFO';
        this.messageAlert = `Recept ${recipe.name} byl uložen.`;
        this.sharedComponent.timeDelay();
      }
      , error => {
        this.spinner.hide();
        console.log('error occured' + error);
        this.showAlert = true;
        this.title = 'CHYBA';
        this.messageAlert = 'Recept nebyl uložen, stala se chyba.';
      },
      () => {
        console.log('completed');
      });
    /* http call to backend with body of FormData within formData */

  }

  decline(): void {
    this.imageBase64 = null;
    this.filename = 'Vložit obrázek';
    this.addNewRecipeForm.reset('', {onlySelf: true});
  }


  onSelectFile(event) { // called each time file input changes
    const file = event.target.files;
    this.filename = file[0].name;
    console.log(this.filename);
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
        this.addNewRecipeForm.patchValue({imageSource: this.imageBase64});
        console.log('e.target.result' + this.imageBase64);
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

  onDeleteImage() {
    this.addNewRecipeForm.patchValue({image: ''});
    this.imageBase64 = '';
    this.filename = 'Vložit obrázek';
  }
}

