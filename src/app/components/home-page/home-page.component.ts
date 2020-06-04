import {Component, OnInit} from '@angular/core';
import {RecipeService} from '../receipts/recipe-service/recipe.service';
import {RecipeEntity} from '../receipts/entity/recipe.entity';
import {NgxSpinnerService} from 'ngx-spinner';
import {NgxWatermarkOptions} from 'ngx-watermark';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  public recipes: RecipeEntity[];
  public searchRecipe: string;
  public localStorage: string;

  public showOnlyForRegWaterMark = 'Pouze pro registrované uživatele.';

  options: NgxWatermarkOptions = {
    text: this.showOnlyForRegWaterMark,
    width: 220,
    height: 100,
    fontSize: '14px',
    color: '#9900EF',
    alpha: 1,
    degree: -25,
    fontWeight: 'bold'
  };


  constructor(private recipeService: RecipeService, private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.localStorage = localStorage.getItem('username');
    if (this.localStorage !== null) {
      this.options.text = '';
    }

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
    this.recipeService.searchText.subscribe(sText => this.searchRecipe = sText);
    console.log('text z home componnet pro hledani: ' + this.searchRecipe);
  }
}
