import {Injectable} from '@angular/core';
import {RecipeEntity} from '../entity/recipe.entity';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {error} from '@angular/compiler/src/util';
import {RouterConstants} from '../../../constants/router.constants';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private headers;

  constructor(private http: HttpClient) {
  }

  getAllRecipes(): Observable<RecipeEntity[]> {
    this.createBasicAuthHeader();
    return this.http.get<RecipeEntity[]>(`${RouterConstants.RECIPES_BACKEND_BASE_URL}/list`,
      {headers: this.headers}).pipe(
      tap(_ => console.log('fetched from backend')),
      catchError(() => error('error fetching data from backend')));
  }

  getRecipeById(id: number): Observable<RecipeEntity> {
    return this.http.get<RecipeEntity>(`${RouterConstants.RECIPES_BACKEND_BASE_URL}/${id}`,
      {headers: this.headers}).pipe(
      tap(_ => console.log('fetched one recipe from backend')),
      catchError(() => error('error fetching data from backend')));
  }

  getRecipeListByUsername(username: string): Observable<RecipeEntity[]> {
    return this.http.get<RecipeEntity[]>(`${RouterConstants.RECIPES_BACKEND_BASE_URL}/list/${username}`).pipe(
      tap(_ => console.log('fetched recipe list from backend')),
      catchError(() => error('error fetching data from backend')));
  }

  saveRecipe(recipe): Observable<RecipeEntity> {
    /* TO DO create userService to get actual username from localstorage */
    recipe.createdBy = localStorage.getItem('username');
    recipe.id = Math.random() * 65530;
    recipe.createdTimeDate = new Date();
    recipe.img = recipe.imageSource;
    console.log('generated id is ' + recipe.id + ' and created time is ' + recipe.createdTimeDate);
    return this.http.post<RecipeEntity>(RouterConstants.RECIPES_BACKEND_BASE_URL + '/save', recipe).pipe(
      tap((rec: RecipeEntity) => console.log(`added hero w/ id=${rec.id}`)),
      catchError(() => error('error saving data to backend')));
  }

  deleteRecipe(id: number): Observable<RecipeEntity> {
    return this.http.delete<RecipeEntity>(`${RouterConstants.RECIPES_BACKEND_BASE_URL}/delete/${id}`).pipe(
      tap((rec: RecipeEntity) => {
        console.log(`recipe deleted with params ${rec}`);
      }),
      catchError(() => {
        error('error deleting recipe');
      }));
  }

  createBasicAuthHeader() {
    const username = 'user';
    const password = 'password';
    this.headers = new HttpHeaders({
      Authorization: 'Basic ' + window.btoa(username + ':' + password)
    });
  }
}

