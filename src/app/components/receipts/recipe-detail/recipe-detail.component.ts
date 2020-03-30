import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {BsModalService} from 'ngx-bootstrap/modal';
import {ActivatedRoute, Router} from '@angular/router';
import {MessagesConstants} from 'src/app/constants/messages.constants';
import {ButtonActionEnum} from 'src/app/constants/button-action.enum';
import {RecipeService} from '../recipe-service/recipe.service';
import {ModalMessageService} from '../../services/modal-message.service';
import {RouterConstants} from '../../../constants/router.constants';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})

export class RecipeDetailComponent implements OnInit, OnDestroy {

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
  private id: number;
  public recipe;

  constructor(private modalService: BsModalService, private router: Router, private recipeService: RecipeService,
              private modalMessageService: ModalMessageService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = +params.get('id');
      console.log('id is ' + this.id);
    });
    this.recipe = this.recipeService.getSelectedRecipe(this.id);
  }

  ngOnDestroy(): void {
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
}
