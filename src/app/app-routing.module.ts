import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from './components/home-page/home-page.component';
import {RecipePageComponent} from './components/receipts/recipe-page.component';
import {AddReceiptFormComponent} from './components/add-receipt-form/add-receipt-form.component';
import {AboutUsComponent} from './components/about-us/about-us.component';
import {RecipeDetailComponent} from './components/receipts/recipe-detail/recipe-detail.component';
import {LoginPageComponent} from './components/login-page/login-page.component';
import {RegisterComponent} from './components/register/register.component';
import {AuthGuardService} from './components/services/auth-guard.service';
import {RecipeEditFormComponent} from './components/receipts/recipe-edit/recipe-edit-form.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomePageComponent, pathMatch: 'full',
  },
  {path: 'login', component: LoginPageComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'recipes/list', canActivate: [AuthGuardService], component: RecipePageComponent},
  {path: 'recipes/list/:id', component: RecipeDetailComponent},
  {path: 'recipes/list/:id/edit', component: RecipeEditFormComponent},
  {path: 'recipes/list/add-recipe', component: AddReceiptFormComponent},
  {path: 'recipes/:id', component: RecipeDetailComponent},
  {path: 'recipes/:id/edit', component: RecipeEditFormComponent},
  {path: 'about-us', component: AboutUsComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: false, preloadingStrategy: PreloadAllModules}
    )]
  ,
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}
