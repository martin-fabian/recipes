import {Injectable} from '@angular/core';
import {ReceiptEntity} from '../entity/receipt.entity';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {RouterConstants} from '../../../constants/router.constants';

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {

  receipts: ReceiptEntity[] = [{
    name: 'Skvělá brokolicová polévka',
    category: 'bez masa',
    img: './assets/img.jpg',
    content: 'V hrnci na středním plameni orestujeme na jemno nakrájenou cibuli na másle. ' +
      'Přidáme na malé kostky nakrájené brambory a opět zarestujeme. ' +
      'Následně přidáme i ružičky brokolice, řádně promícháme, osolíme a opepříme. ' +
      'Zalijeme zeleninovým či masovým vývarem (jen tak, aby ještě špičky zeleniny byly nad hladinou) a ' +
      'přivedeme k varu. Můžeme zde vyvařit i košťál brokolice. '
  }, {
    name: 'Skvělá brokolicová polévka',
    category: 'bez masa',
    img: './assets/img.jpg',
    content: 'V hrnci na středním plameni orestujeme na jemno nakrájenou cibuli na másle. ' +
      'Přidáme na malé kostky nakrájené brambory a opět zarestujeme. ' +
      'Následně přidáme i ružičky brokolice, řádně promícháme, osolíme a opepříme. ' +
      'Zalijeme zeleninovým či masovým vývarem (jen tak, aby ještě špičky zeleniny byly nad hladinou) a ' +
      'přivedeme k varu. Můžeme zde vyvařit i košťál brokolice. '
  }, {
    name: 'Skvělá brokolicová polévka',
    category: 'bez masa',
    img: './assets/img.jpg',
    content: 'V hrnci na středním plameni orestujeme na jemno nakrájenou cibuli na másle. ' +
      'Přidáme na malé kostky nakrájené brambory a opět zarestujeme. ' +
      'Následně přidáme i ružičky brokolice, řádně promícháme, osolíme a opepříme. ' +
      'Zalijeme zeleninovým či masovým vývarem (jen tak, aby ještě špičky zeleniny byly nad hladinou) a ' +
      'přivedeme k varu. Můžeme zde vyvařit i košťál brokolice. '
  }];

  constructor(private http: HttpClient) {
  }


  getReceiptsList(): Observable<ReceiptEntity[]> {
    return of(this.receipts);
  }

  getAllReceipts(): ReceiptEntity[] {
    return [];
  }

  addReceipt(receipt: ReceiptEntity) {
    return this.http.post(RouterConstants.BASE_URL, receipt);
  }

  getSelectedReceipts(): ReceiptEntity {
    return null;
  }
}
