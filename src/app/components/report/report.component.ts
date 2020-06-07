import {Component, OnDestroy, OnInit} from '@angular/core';
import {CacheService} from '../services/cache.service';
import {RecipeEntity} from '../receipts/entity/recipe.entity';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})

export class ReportComponent implements OnInit, OnDestroy {

  public recipes: RecipeEntity[];
  public total: number;
  public myRecipes: number;

  constructor(private cacheService: CacheService) {
  }

  ngOnInit(): void {
    this.myRecipes = 0;
    this.recipes = this.cacheService.recipeCached;
    this.total = this.recipes?.length;
    console.log(this.total);
    if (localStorage.getItem('username') !== null) {
      this.recipes.forEach(recipe => {
        if (recipe.createdBy === localStorage.getItem('username')) {
          this.myRecipes += 1;
          console.log('myrecipes..' + this.myRecipes);
        } else {
          this.myRecipes = 0;
          console.log('registrovany user, ale zadne recepty 0');
        }
      });
    } else {
      this.myRecipes = null;
    }
  }

  ngOnDestroy(): void {
    this.total = null;
    this.myRecipes = null;
  }


}
