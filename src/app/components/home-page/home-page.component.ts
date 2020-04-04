import {Component, OnInit} from '@angular/core';
import {RecipeService} from '../receipts/recipe-service/recipe.service';
import {RecipeEntity} from '../receipts/entity/recipe.entity';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  public recipes: RecipeEntity[];

  constructor(private recipeService: RecipeService, private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.spinner.show();
    this.recipeService.getAllRecipes().subscribe(recipes => {
      this.recipes = recipes;
      console.log('returned from backend ' + this.recipes);
    }, error => console.error(error), () => {
      console.log('success');
    });
    setTimeout(() => {
        this.spinner.hide();
      }, 1000
    );
  }
}
