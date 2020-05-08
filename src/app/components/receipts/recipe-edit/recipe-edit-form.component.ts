import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {BsModalService} from 'ngx-bootstrap/modal';
import {ActivatedRoute, Router} from '@angular/router';
import {MessagesConstants} from 'src/app/constants/messages.constants';
import {ButtonActionEnum} from 'src/app/constants/button-action.enum';
import {RecipeService} from '../recipe-service/recipe.service';
import {ModalMessageService} from '../../services/modal-message.service';
import {RouterConstants} from '../../../constants/router.constants';
import {RecipeEntity} from '../entity/recipe.entity';
import {CacheService} from '../../services/cache.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-recipe-edit-form',
  templateUrl: './recipe-edit-form.component.html',
  styleUrls: ['./recipe-edit-form.component.scss']
})

export class RecipeEditFormComponent implements OnInit, OnDestroy {

  public MessagesConstants = MessagesConstants;
  public ButtonActionEnum = ButtonActionEnum;
  public maxLengthVarContent = 3000;
  public maxLengthVarName = 50;
  public addNewRecipeForm: FormGroup;
  public filename = 'Vložit obrázek';
  public imageBase64: string;
  public alertMaxSize = false;
  public alertImageType = false;
  public recipe: RecipeEntity;
  private id: number;
  public subscription: Subscription[] = [];

  constructor(private modalService: BsModalService, private route: Router, private recipeService: RecipeService,
              private modalMessageService: ModalMessageService, private cacheService: CacheService,
              private router: ActivatedRoute, private receipService: RecipeService) {
  }

  ngOnInit(): void {
    this.subscription.push(this.router.paramMap.subscribe(params => {
      this.id = +params.get('id');
    }));
    // this.recipe = this.cacheService.getRecipeFromCache();
    this.subscription.push(this.recipeService.getRecipeById(this.id).subscribe(recipe => {
      this.recipe = recipe;

      this.addNewRecipeForm = new FormGroup({
        name: new FormControl(this.recipe.name, Validators.compose(
          [Validators.required, Validators.maxLength(this.maxLengthVarName)])),
        category: new FormControl(this.recipe.category),
        image: new FormControl('', Validators.maxLength(this.maxLengthVarName)),
        content: new FormControl(this.recipe.content, Validators.compose(
          [Validators.required, Validators.maxLength(this.maxLengthVarContent)])),
        imageSource: new FormControl(this.recipe.img)
      });
      this.imageBase64 = this.recipe.img;
    }));
    this.subscription.push(this.modalMessageService.onUpdateSubscriptionModalWindow.subscribe(() => {
      this.confirm();
    }));
    this.subscription.push(this.modalMessageService.onResetSubscriptionModalWindow.subscribe(() => {
      this.decline();
    }));
  }

  ngOnDestroy(): void {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

  openSharedModal(typeOfAction: ButtonActionEnum, messageTitleModal: MessagesConstants) {
    this.modalMessageService.triggerOpenModalWindow(typeOfAction, messageTitleModal);
  }

  confirm(): void {
    console.log(this.addNewRecipeForm.value);
    const updatedRecipe: RecipeEntity = {
      id: this.recipe.id,
      createdBy: this.recipe.createdBy,
      createdTimeDate: this.recipe.createdTimeDate,
      name: this.addNewRecipeForm.value.name,
      img: this.addNewRecipeForm.value.imageSource,
      content: this.addNewRecipeForm.value.content,
      category: this.addNewRecipeForm.value.categories
    };
    this.subscription.push(this.receipService.saveRecipe(updatedRecipe).subscribe(
      recipes => console.log('recipes updated' + recipes)
      , error => console.log('error occured while updating recipe' + error),
      () => console.log('completed')));
    this.route.navigateByUrl(RouterConstants.BASE_URL);
  }

  decline(): void {
    this.imageBase64 = null;
    this.filename = 'Vložit obrázek';
    this.addNewRecipeForm.reset('', {onlySelf: true});
  }

  returnBack(): void {
    this.route.navigateByUrl(`recipes/${this.recipe.id}`);
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

