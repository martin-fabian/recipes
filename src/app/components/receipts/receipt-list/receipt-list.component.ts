import {Component, OnInit} from '@angular/core';
import {ReceiptService} from '../receipt-service/receipt.service';
import {ReceiptEntity} from '../entity/receipt.entity';

@Component({
  selector: 'app-receipt-list',
  templateUrl: './receipt-list.component.html',
  styleUrls: ['./receipt-list.component.scss']
})
export class ReceiptListComponent implements OnInit {

  receipts: ReceiptEntity[];

  constructor(private receiptService: ReceiptService) {
  }

  ngOnInit(): void {
    this.receiptService.getReceiptsList().subscribe(
      receipts => this.receipts = receipts
    );
  }

}
