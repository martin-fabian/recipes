import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthUserService} from '../services/auth-user.service';
import {Subscription} from 'rxjs';
import {UserService} from '../users/user-service/user.service';
import {RecipeService} from '../receipts/recipe-service/recipe.service';
import {AlertService} from '../services/alert.service';

@Component({
  selector: 'app-main-menu',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit, OnDestroy {

  public logged = false;
  private sub: Subscription;
  public searchText: string;
  isCollapsed = true;

  constructor(private authService: AuthUserService, public userService: UserService, public recipeService: RecipeService,
              public alertService: AlertService) {
  }

  ngOnInit() {
    this.sub = this.authService.subsTokenSetUp.subscribe((val) => {
      if (val) {
        if (this.authService.getToken()) {
          this.logged = true;
        }
      } else {
        this.logged = false;
      }
    });

    this.logged = false;
  }

  clearToken() {
    if (this.logged) {
      localStorage.clear();
      this.authService.subsTokenSetUp.next(false);
      this.clearUserInMenu();
      this.alertService.clearMsg();
    }
    localStorage.clear();
    this.alertService.clearMsg();
  }

  clearUserInMenu() {
    this.userService.user = null;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  postSearchText(searchText) {
    this.searchText = searchText;
    console.log('main menu text ' + this.searchText);
    this.recipeService.searchText.next(this.searchText);
  }
}
