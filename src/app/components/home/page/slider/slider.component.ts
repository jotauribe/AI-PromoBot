import { Component, OnInit } from '@angular/core';
import {Promotion} from '../../../promotion/promotion.model';
import {PromosService} from '../../../../services/promos.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  promotions: Promotion[];

  bestPromo: Promotion;

  constructor(private promosService: PromosService) {
    this.promotions = [];
    this.promosService.getBestPromo()
      .then(bestPromo => {
        this.promotions.push(bestPromo);
        this.bestPromo = bestPromo;
        console.log('BEST PROMO Description' + this.bestPromo.description);
      });
  }

  ngOnInit() {

  }

}
