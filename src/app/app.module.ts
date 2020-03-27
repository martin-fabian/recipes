import {BrowserModule} from '@angular/platform-browser';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {AppComponent} from './app.component';
import {ComponentModule} from './components/component.module';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ModalModule} from 'ngx-bootstrap/modal';
import {HttpClientModule} from '@angular/common/http';
import {AlertModule} from 'ngx-bootstrap';
import {ReactiveFormsModule} from '@angular/forms';


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
    ModalModule.forRoot(),
    AlertModule.forRoot()
  ],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
