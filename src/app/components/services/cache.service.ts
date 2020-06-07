import {Injectable} from '@angular/core';
import {RecipeEntity} from '../receipts/entity/recipe.entity';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  public recipeCached: RecipeEntity[] = [];

  constructor() {
  }

  saveRecipesToCache(recipe: RecipeEntity[]) {
    if (recipe != null) {
      this.recipeCached.push(...recipe);
    }
  }

  getRecipesFromCache(): RecipeEntity[] {
    return this.recipeCached;
  }


  resetCachedRecipes(): void {
    this.recipeCached = [];
  }


}
