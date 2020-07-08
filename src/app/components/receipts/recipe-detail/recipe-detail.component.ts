import {Component, OnDestroy, OnInit} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {ActivatedRoute, Router} from '@angular/router';
import {MessagesConstants} from 'src/app/constants/messages.constants';
import {ButtonActionEnum} from 'src/app/constants/button-action.enum';
import {RecipeService} from '../recipe-service/recipe.service';
import {ModalMessageService} from '../../services/modal-message.service';
import {RecipeEntity} from '../entity/recipe.entity';
import {Subscription} from 'rxjs';
import {NgxSpinnerService} from 'ngx-spinner';
import {AlertService} from '../../services/alert.service';
import {SharedComponent} from '../../shared/shared.component';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})

export class RecipeDetailComponent implements OnInit, OnDestroy {

  public MessagesConstants = MessagesConstants;
  public ButtonActionEnum = ButtonActionEnum;
  public filename = 'Vložit obrázek';
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
              private spinner: NgxSpinnerService, public alertService: AlertService, private sharedComponent: SharedComponent) {
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
        this.sharedComponent.timeDelay();
      }, () => this.spinner.hide()));
    // this.spinner.hide();
  }
}

