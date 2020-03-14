import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
    selector: 'app-main-menu',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './main-menu.component.html',
    styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit, OnDestroy {

    searchForm = new FormGroup({});

    constructor() {
    }

    ngOnInit() {
    }

    ngOnDestroy(): void {
    }

}
