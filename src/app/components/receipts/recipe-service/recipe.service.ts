import {Injectable} from '@angular/core';
import {RecipeEntity} from '../entity/recipe.entity';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {RouterConstants} from '../../../constants/router.constants';
import {catchError, tap} from 'rxjs/operators';
import {error} from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa('user:password')
    })
  };

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

  getAllRecipes(): Observable<RecipeEntity[]> {
    return this.http.get<RecipeEntity[]>('http://localhost:8080/recipes/list').pipe(
      tap(_ => console.log('fetched from backend')),
      catchError(() => error('error fetching data from backend')));
  }


  addRecipe(recipe: RecipeEntity) {
    return this.http.post(RouterConstants.BASE_URL, recipe);
  }

  getSelectedRecipe(id: number) {
    console.log(this.recipes[id]);
    return this.recipes[id];
  }

  getRecipeById(id: number): Observable<RecipeEntity> {
    return this.http.get<RecipeEntity>(`http://localhost:8080/recipes/${id}`).pipe(
      tap(_ => console.log('fetched one recipe from backend')),
      catchError(() => error('error fetching data from backend')));
  }


  getRecipeListByUsername(username: string): Observable<RecipeEntity[]> {
    return this.http.get<RecipeEntity[]>(`http://localhost:8080/recipes/list/${username}`).pipe(
      tap(_ => console.log('fetched recipe list from backend')),
      catchError(() => error('error fetching data from backend')));
  }
}
