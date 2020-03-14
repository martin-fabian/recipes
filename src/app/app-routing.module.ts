import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from './components/home-page/home-page.component';
import {ReceiptPageComponent} from './components/receipts/receipt-page.component';
import {AddReceiptFormComponent} from './components/add-receipt-form/add-receipt-form.component';
import {AboutUsComponent} from './components/about-us/about-us.component';

const appRoutes: Routes = [
    {
        path: '',
        component: HomePageComponent, pathMatch: 'full',
    },
    {path: 'receipt', component: ReceiptPageComponent},
    {path: 'receipt/add-receipt', component: AddReceiptFormComponent},
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
