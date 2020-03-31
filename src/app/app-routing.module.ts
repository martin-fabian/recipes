import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from './components/home-page/home-page.component';
import {RecipePageComponent} from './components/receipts/recipe-page.component';
import {AddReceiptFormComponent} from './components/add-receipt-form/add-receipt-form.component';
import {AboutUsComponent} from './components/about-us/about-us.component';
import {RecipeDetailComponent} from './components/receipts/recipe-detail/recipe-detail.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomePageComponent, pathMatch: 'full',
  },
  {path: 'recipes/list', component: RecipePageComponent},
  {path: 'recipes/add-recipe', component: AddReceiptFormComponent},
  {path: 'recipes/list/:id', component: RecipeDetailComponent},
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
