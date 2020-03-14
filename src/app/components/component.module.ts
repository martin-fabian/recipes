import {NgModule} from '@angular/core';
import {MainMenuComponent} from './main-menu/main-menu.component';
import {RouterModule} from '@angular/router';
import {HomePageComponent} from './home-page/home-page.component';
import {ReceiptPageComponent} from './receipts/receipt-page.component';
import {FooterComponent} from './footer/footer.component';
import {AddReceiptFormComponent} from './add-receipt-form/add-receipt-form.component';
import {BrowserModule} from '@angular/platform-browser';
import {ReceiptListComponent} from './receipts/receipt-list/receipt-list.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {ReceiptFormMessageComponent} from './modal-messiging/receipt-form-message.component';
import {AlertModule, TabsModule} from 'ngx-bootstrap';
import {AboutUsComponent} from './about-us/about-us.component';


const components = [
    MainMenuComponent,
    HomePageComponent,
    ReceiptPageComponent,
    FooterComponent,
    AddReceiptFormComponent,
    ReceiptListComponent,
    ReceiptFormMessageComponent
];

@NgModule({
    imports: [
        RouterModule,
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        TabsModule,
        AlertModule
    ],
    declarations: [
        ...components,
        AboutUsComponent
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
