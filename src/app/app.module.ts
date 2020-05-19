import {BrowserModule} from '@angular/platform-browser';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {AppComponent} from './app.component';
import {ComponentModule} from './components/component.module';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ModalModule} from 'ngx-bootstrap/modal';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AlertModule} from 'ngx-bootstrap';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthGuardService} from './components/services/auth-guard.service';
import {TokenInterceptor} from './components/interceptor/token.interceptor';
import {Ng2SearchPipeModule} from 'ng2-search-filter';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    ComponentModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    ModalModule.forRoot(),
    AlertModule.forRoot()
  ],
  providers: [AuthGuardService, {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}],
  schemas: [NO_ERRORS_SCHEMA],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
