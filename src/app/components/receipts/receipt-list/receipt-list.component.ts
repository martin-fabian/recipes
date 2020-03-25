import {Component, OnDestroy, OnInit} from '@angular/core';
import {ReceiptService} from '../receipt-service/receipt.service';
import {ReceiptEntity} from '../entity/receipt.entity';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-receipt-list',
  templateUrl: './receipt-list.component.html',
  styleUrls: ['./receipt-list.component.scss']
})
export class ReceiptListComponent implements OnInit, OnDestroy {

  receipts: ReceiptEntity[];
  private subscription: Subscription;

  constructor(private receiptService: ReceiptService) {
  }

  ngOnInit(): void {
    this.subscription = this.receiptService.getReceiptsList().subscribe(
      receipts => this.receipts = receipts
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
