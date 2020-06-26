import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {BsModalService} from 'ngx-bootstrap/modal';
import {ActivatedRoute, Router} from '@angular/router';
import {MessagesConstants} from 'src/app/constants/messages.constants';
import {ButtonActionEnum} from 'src/app/constants/button-action.enum';
import {RecipeService} from '../recipe-service/recipe.service';
import {ModalMessageService} from '../../services/modal-message.service';
import {RouterConstants} from '../../../constants/router.constants';
import {RecipeEntity} from '../entity/recipe.entity';
import {Subscription} from 'rxjs';
import {NgxSpinnerService} from 'ngx-spinner';
import {AlertService} from '../../services/alert.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})

export class RecipeDetailComponent implements OnInit, OnDestroy {

  public MessagesConstants = MessagesConstants;
  public ButtonActionEnum = ButtonActionEnum;
  public addNewRecipeForm: FormGroup;
  public filename = 'Vložit obrázek';
  public imageBase64: string;
  public alertMaxSize = false;
  public alertImageType = false;
  private formData: FormData;
  private id: number;
  public recipe: RecipeEntity;
  public subscription: Subscription[] = [];
  registeredUserLocalStorage: string;
  public showNotLoggedMsg: boolean;
  public showNotLoggedMsgString = 'Pro zobrazeni obsahu se musíte přihlásit, ' +
    'nebo zaregistrovat. Stačí Vám k tomu pouze jméno, heslo a email.';
  public showAlert: boolean;
  public title: string;
  public messageAlert: string;


  constructor(private modalService: BsModalService, private router: Router, private recipeService: RecipeService,
              private modalMessageService: ModalMessageService, private route: ActivatedRoute,
              private spinner: NgxSpinnerService, public alertService: AlertService) {
  }

  ngOnInit(): void {
    this.showAlert = false;
    this.spinner.show();
    this.showNotLoggedMsg = false;
    this.registeredUserLocalStorage = localStorage.getItem('username');
    this.subscription.push(this.route.paramMap.subscribe(params => {
      this.id = +params.get('id');
      console.log('id is ' + this.id);
    }));
    // this.recipe = this.recipeService.getSelectedRecipe(this.id);
    this.subscription.push(this.recipeService.getRecipeById(this.id).subscribe(recipe => {
        this.recipe = recipe;
        this.spinner.hide();
      }, error => {
        console.log('error occured' + error);
        this.showNotLoggedMsgString += ': ' + error;
        this.showNotLoggedMsg = true;
        this.spinner.hide();
      },
      () => console.log('completed')));

    this.subscription.push(this.modalMessageService.onDeleteSubscriptionModalWindow.subscribe(
      () => this.onDeleteRecipe(this.recipe.id)));
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }

  openSharedModal(typeOfAction: ButtonActionEnum, messageTitleModal: MessagesConstants) {
    this.modalMessageService.triggerOpenModalWindow(typeOfAction, messageTitleModal);
  }

  confirm(): void {
    console.log(this.addNewRecipeForm.value);
    console.log(this.toFormDataTransform(this.addNewRecipeForm.value));
    /* http call to backend with body of FormData within formData */
    this.router.navigateByUrl(RouterConstants.BASE_URL);
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
        console.log(this.filename.length);
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

  onDeleteRecipe(id: number) {
    this.spinner.show();
    /* TO DO user service to get actual user name */
    const username = this.registeredUserLocalStorage;
    const createdBy = this.recipe.createdBy;
    if (createdBy !== username) {
      alert('nemate pravo smazat tento recept');
      return;
    }
    this.subscription.push(this.recipeService.deleteRecipe(id).subscribe(
      (recipe) => {
        this.spinner.hide();
        this.showAlert = true;
        this.title = 'INFO';
        this.messageAlert = 'Recept byl smazán.';
        console.log(`recipe >> ${recipe.id} >> was deleted`);
        setTimeout(() => {
            console.log('couting down 3s');
            this.router.navigateByUrl(RouterConstants.BASE_URL);
          }, 3000
        );
      }, () => this.spinner.hide()));
    // this.spinner.hide();
  }
}

