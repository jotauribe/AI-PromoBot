import { Component, OnInit } from '@angular/core';
import {Promotion} from '../promotion/promotion.model';
import {PromosService} from '../../services/promos.service';
import {GeolocationService} from '../../services/geolocation.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  title = 'Mapa de Tiendas';
  lat: number;
  lng: number;
  center;
  positions = [];

  promotions: Promotion[];

  constructor(private promosService: PromosService,
              private geolocationService: GeolocationService) {

    this.promotions = this.promosService.getPromotions();
    console.log(this.promotions);
    for (let i = 0; i < this.promotions.length; i++) {
      this.positions.push([this.promotions[i].shop.latitude, this.promotions[i].shop.longitude]);
      console.log(this.promotions[i].shop.latitude);
    }
    this.geolocationService.getUserLocation()
      .then((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.center = [this.lat, this.lng];
        console.log(this.lat);
        console.log(this.lng);
      });
  }

  ngOnInit() {

  }

  onMarkerInit(marker) {
    console.log('marker', marker);
  }

}
