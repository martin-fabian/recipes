import {Component} from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html'
})
export class SliderComponent {

  public images = [11, 22, 33].map((n) => `assets/carousel-img/${n}.jpg`);

}
