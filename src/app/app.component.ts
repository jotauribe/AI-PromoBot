import {Component, OnInit} from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { } from 'googlemaps';
import {PromosService} from './services/promos.service';
import {GeolocationService} from './services/geolocation.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public latitude;
  public longitude;

  constructor(private promosService: PromosService,
              private geolocationService: GeolocationService) {
  }

  ngOnInit(): void {
    const response = this.promosService.getTheProm().then(console.log);
  }


}
