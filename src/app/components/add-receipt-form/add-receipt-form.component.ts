import {Component, OnInit, TemplateRef} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {BsModalService, BsModalRef} from 'ngx-bootstrap/modal';
import {Router} from '@angular/router';
import {ReceiptService} from '../receipts/receipt-service/receipt.service';
import {MessagesConstants} from '../../constants/messages.constants';
import {RouterConstants} from '../../constants/router.constants';
import {ModalMessageService} from '../services/modal-message.service';
import {ButtonActionEnum} from '../../constants/button-action.enum';

@Component({
    selector: 'app-add-receipt-form',
    templateUrl: './add-receipt-form.component.html',
    styleUrls: ['./add-receipt-form.component.scss']
})

export class AddReceiptFormComponent implements OnInit {

    private modalRef: BsModalRef;
    private imgUrl: string | ArrayBuffer;
    public MessagesConstants = MessagesConstants;
    public ButtonActionEnum = ButtonActionEnum;

    addNewReceiptForm = new FormGroup({
        name: new FormControl('', Validators.required),
        category: new FormControl(''),
        imgUrl: new FormControl(''),
        content: new FormControl('', Validators.required)
    });

    constructor(private modalService: BsModalService, private route: Router, private receipService: ReceiptService,
                private modalMessageService: ModalMessageService) {
    }

    ngOnInit(): void {
        this.modalMessageService.onConfirmSubscriptionModalWindow.subscribe(() => this.confirm());
        this.modalMessageService.onResetSubscriptionModalWindow.subscribe(() => this.decline());
    }

    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template, {class: 'modal-md'});
        if (this.modalMessageService.onConfirmSubscriptionModalWindow) {
            this.confirm();
        }
    }

    openSharedModal(typeOfAction: ButtonActionEnum, messageTitleModal: MessagesConstants) {
        this.modalMessageService.triggerOpenModalWindow(typeOfAction, messageTitleModal);
    }

    confirm(): void {
        console.log(this.addNewReceiptForm.value);
        this.route.navigateByUrl(RouterConstants.BASE_URL);
    }

    decline(): void {
        this.addNewReceiptForm.reset('', {onlySelf: true});
    }


    onSelectFile(event) { // called each time file input changes
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (e: any) => { // called once readAsDataURL is completed
                this.imgUrl = e.target.result;
            };
            const imgUrlTemp = reader.readAsDataURL(event.target.files[0]); // read file as data url
            this.addNewReceiptForm.patchValue([imgUrlTemp]);
        } else {
            prompt(MessagesConstants.UPLOAD_IMG_FAILED);
            console.log('Failed to load img.');
            return;
        }
    }

    showDelMsg() {
        console.log('Vymazat....');
    }

}

