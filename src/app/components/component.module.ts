import {NgModule} from '@angular/core';
import {MainMenuComponent} from './main-menu/main-menu.component';
import {RouterModule} from '@angular/router';
import {HomePageComponent} from './home-page/home-page.component';
import {RecipePageComponent} from './receipts/recipe-page.component';
import {FooterComponent} from './footer/footer.component';
import {AddReceiptFormComponent} from './add-receipt-form/add-receipt-form.component';
import {BrowserModule} from '@angular/platform-browser';
import {RecipeListComponent} from './receipts/recipe-list/recipe-list.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {RecipeFormMessageComponent} from './modal-messiging/recipe-form-message.component';
import {AlertModule, TabsModule} from 'ngx-bootstrap';
import {AboutUsComponent} from './about-us/about-us.component';
import {DotsPipe} from '../pipes/dots.pipe';
import {RecipeEditFormComponent} from './receipts/recipe-edit/recipe-edit-form.component';
import {RecipeDetailComponent} from './receipts/recipe-detail/recipe-detail.component';
import {NgxSpinnerModule} from 'ngx-spinner';
import {LoginPageComponent} from './login-page/login-page.component';
import {RegisterComponent} from './register/register.component';
import {AlertComponent} from './alert/alert.component';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {NgxWatermarkModule} from 'ngx-watermark';
import {ReportComponent} from './report/report.component';
import {SliderComponent} from './slider/slider.component';
import {CarouselModule} from 'ngx-bootstrap/carousel';


const components = [
  MainMenuComponent,
  HomePageComponent,
  RecipePageComponent,
  FooterComponent,
  AddReceiptFormComponent,
  RecipeListComponent,
  RecipeFormMessageComponent,
  RecipeEditFormComponent,
  RecipeDetailComponent,
  LoginPageComponent,
  RegisterComponent,
  AlertComponent,
  ReportComponent,
  SliderComponent
];

@NgModule({
  imports: [
    RouterModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    TabsModule,
    AlertModule,
    NgxSpinnerModule,
    Ng2SearchPipeModule,
    NgxWatermarkModule,
    CarouselModule.forRoot()
  ],
  declarations: [
    ...components,
    AboutUsComponent,
    DotsPipe
  ],
  providers: [],
  exports: [
    MainMenuComponent,
    FooterComponent
  ],
  entryComponents: []
})
export class ComponentModule {

}
