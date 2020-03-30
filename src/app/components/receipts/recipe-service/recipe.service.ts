import {Injectable} from '@angular/core';
import {RecipeEntity} from '../entity/recipe.entity';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {RouterConstants} from '../../../constants/router.constants';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipes: RecipeEntity[] = [{
    id: 1,
    name: 'Skvělá brokolicová polévka',
    category: 'bez masa',
    img: './assets/img.jpg',
    content: 'V hrnci na středním plameni orestujeme na jemno nakrájenou cibuli na másle. ' +
      'Přidáme na malé kostky nakrájené brambory a opět zarestujeme. ' +
      'Následně přidáme i ružičky brokolice, řádně promícháme, osolíme a opepříme. ' +
      'Zalijeme zeleninovým či masovým vývarem (jen tak, aby ještě špičky zeleniny byly nad hladinou) a ' +
      'přivedeme k varu. Můžeme zde vyvařit i košťál brokolice. '
  }, {
    id: 2,
    name: 'Skvělá brokolicová polévka',
    category: 'bez masa',
    img: './assets/img.jpg',
    content: 'V hrnci na středním plameni orestujeme na jemno nakrájenou cibuli na másle. ' +
      'Přidáme na malé kostky nakrájené brambory a opět zarestujeme. ' +
      'Následně přidáme i ružičky brokolice, řádně promícháme, osolíme a opepříme. ' +
      'Zalijeme zeleninovým či masovým vývarem (jen tak, aby ještě špičky zeleniny byly nad hladinou) a ' +
      'přivedeme k varu. Můžeme zde vyvařit i košťál brokolice. '
  }, {
    id: 3,
    name: 'Skvělá brokolicová polévka',
    category: 'bez masa',
    img: './assets/img.jpg',
    content: 'V hrnci na středním plameni orestujeme na jemno nakrájenou cibuli na másle. ' +
      'Přidáme na malé kostky nakrájené brambory a opět zarestujeme. ' +
      'Následně přidáme i ružičky brokolice, řádně promícháme, osolíme a opepříme. ' +
      'Zalijeme zeleninovým či masovým vývarem (jen tak, aby ještě špičky zeleniny byly nad hladinou) a ' +
      'přivedeme k varu. Můžeme zde vyvařit i košťál brokolice. '
  }];

  constructor(private http: HttpClient) {
  }


  getRecipesList(): Observable<RecipeEntity[]> {
    return of(this.recipes);
  }

  getAllRecipes(): RecipeEntity[] {
    return [];
  }

  addRecipe(recipe: RecipeEntity) {
    return this.http.post(RouterConstants.BASE_URL, recipe);
  }

  getSelectedRecipes(): RecipeEntity {
    return null;
  }

  getSelectedRecipe(id: number) {
    console.log(this.recipes[id]);
    return this.recipes[id];
  }
}
