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
    public MessagesConstants = MessagesConstants;
    public ButtonActionEnum = ButtonActionEnum;
    public maxLengthVarContent = 3000;
    public maxLengthVarName = 50;
    public addNewReceiptForm: FormGroup;
    public filename = 'Vložit obrázek';

    constructor(private modalService: BsModalService, private route: Router, private receipService: ReceiptService,
                private modalMessageService: ModalMessageService) {
    }

    ngOnInit(): void {
        this.addNewReceiptForm = new FormGroup({
            name: new FormControl('', Validators.compose(
                [Validators.required, Validators.maxLength(this.maxLengthVarName)])),
            category: new FormControl(''),
            imgUrl: new FormControl(''),
            content: new FormControl('', Validators.compose(
                [Validators.required, Validators.maxLength(this.maxLengthVarContent)]))
        });
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
        const file = event.target.files;
        if (file && file[0]) {
            const mimeType = file[0].type;
            if (mimeType.match(/image\/*/) == null) {
                return;
            }
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file[0]);
            fileReader.onload = () => {
                this.addNewReceiptForm.patchValue([file[0]]);
                this.filename = file[0].name;
            };

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

