import {Injectable} from '@angular/core';
import {RecipeEntity} from '../receipts/entity/recipe.entity';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  public recipeCached: RecipeEntity[] = [];

  constructor() {
  }

  saveRecipeToCache(recipe: RecipeEntity) {
    if (recipe != null) {
      this.recipeCached.push(recipe);
    }
  }

  getRecipeFromCache(): RecipeEntity {
    if (this.recipeCached[0]) {
      return this.recipeCached[0];
    }
  }

  resetCachedRecipes(): void {
    this.recipeCached = null;
  }


}
