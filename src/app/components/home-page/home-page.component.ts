import {Component, OnInit} from '@angular/core';
import {RecipeService} from '../receipts/recipe-service/recipe.service';
import {RecipeEntity} from '../receipts/entity/recipe.entity';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  public recipes: RecipeEntity[];

  constructor(private recipeService: RecipeService) {
  }

  ngOnInit(): void {
    this.recipeService.getAllRecipes().subscribe(recipes => {
      this.recipes = recipes;
      console.log('returned from backend ' + this.recipes);
    }, error => console.error(error), () => {
      console.log('success');
    });
  }
}
