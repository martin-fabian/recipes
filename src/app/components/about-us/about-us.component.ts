import {Component, OnInit} from '@angular/core';
import {faCoffee} from '@fortawesome/free-solid-svg-icons/faCoffee';
import {faLaptopCode} from '@fortawesome/free-solid-svg-icons/faLaptopCode';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  faCoffee = faCoffee;
  faLaptopCode = faLaptopCode;

  constructor() {
  }

  ngOnInit(): void {
  }

}
