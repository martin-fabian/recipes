import {Injectable} from '@angular/core';
import {RecipeEntity} from '../entity/recipe.entity';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {error} from '@angular/compiler/src/util';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  public searchText = new Subject<string>();
  public allRecipesSaved: RecipeEntity[] = [];

  constructor(private http: HttpClient) {
  }

  getAllRecipes(): Observable<RecipeEntity[]> {
    return this.http.get<RecipeEntity[]>(`${environment.backendURL}/recipes/list`).pipe(
      tap(recipes => {
        console.log('fetched from backend');
        recipes.forEach(recipe => this.allRecipesSaved.push(recipe));
      }),
      catchError(() => error('error fetching data from backend')));
  }

  getRecipeById(id: number): Observable<RecipeEntity> {
    return this.http.get<RecipeEntity>(`${environment.backendURL}/recipes/${id}`).pipe(
      tap(_ => console.log('fetched one recipe from backend')),
      catchError(() => error('error fetching data from backend')));
  }

  getRecipeListByUsername(username: string): Observable<RecipeEntity[]> {
    return this.http.get<RecipeEntity[]>(`${environment.backendURL}/recipes/list/${username}`).pipe(
      tap(_ => console.log('fetched recipe list from backend')),
      catchError(() => error('error fetching data from backend')));
  }

  saveRecipe(recipe): Observable<RecipeEntity> {
    /* TO DO create userService to get actual username from localstorage */
    if (recipe.id && recipe.createdBy && recipe.createdTimeDate) {
      return this.http.post<RecipeEntity>(environment.backendURL + '/recipes/save', recipe).pipe(
        tap((rec: RecipeEntity) => console.log(`recipe with id=${rec.id} sent to update`)),
        catchError(() => error('error updating data to backend')));
    } else {
      recipe.createdBy = localStorage.getItem('username');
      recipe.id = Math.random() * 65530;
      recipe.createdTimeDate = new Date();
      recipe.img = recipe.imageSource;
      console.log('generated id is ' + recipe.id + ' and created time is ' + recipe.createdTimeDate);
      return this.http.post<RecipeEntity>(environment.backendURL + '/recipes/save', recipe).pipe(
        tap((rec: RecipeEntity) => console.log(`added recipe with id=${rec.id}`)),
        catchError(() => error('error saving data to backend')));
    }
  }

  deleteRecipe(id: number): Observable<RecipeEntity> {
    return this.http.delete<RecipeEntity>(`${environment.backendURL}/recipes/delete/${id}/${localStorage.getItem('username')}`).pipe(
      tap((rec: RecipeEntity) => {
        console.log(`recipe deleted with params ${rec}`);
      }),
      catchError(() => {
        error('error deleting recipe');
      }));
  }
}

