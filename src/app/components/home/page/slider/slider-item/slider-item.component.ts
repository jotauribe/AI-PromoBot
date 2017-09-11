import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {Promotion, Shop} from '../../../../promotion/promotion.model';

@Component({
  selector: 'app-slider-item',
  templateUrl: './slider-item.component.html',
  styleUrls: ['./slider-item.component.css']
})
export class SliderItemComponent implements OnInit {

  @HostBinding('attr.class') cssClass = 'item';
  @Input() promotion: Promotion;

  constructor() {}

  ngOnInit() {
  }

}
