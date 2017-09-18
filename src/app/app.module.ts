import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ConsoleComponent } from './components/console/console.component';
import { PageComponent } from './components/home/page/page.component';
import { PromotionComponent } from './components/promotion/promotion.component';
import { SliderComponent } from './components/home/page/slider/slider.component';
import { SliderItemComponent } from './components/home/page/slider/slider-item/slider-item.component';
import {PromosService} from "./services/promos.service";
import {GeolocationService} from "./services/geolocation.service";
import { AdComponent } from './components/ad/ad.component';
import {MapComponent} from "./components/map/map.component";
import {Ng2MapModule} from "ng2-map";

const routes: Routes = [
  { path: '' , component: HomeComponent },
  { path: 'console' , component: ConsoleComponent },
  { path: 'map', component: MapComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ConsoleComponent,
    PageComponent,
    PromotionComponent,
    SliderComponent,
    SliderItemComponent,
    AdComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot( routes ),
    Ng2MapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyCcl6a8q19fNlugpAAxJA2V6V8H6B2ZBcc'}),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCcl6a8q19fNlugpAAxJA2V6V8H6B2ZBcc',
      libraries: ['geometry']
    })
  ],
  providers: [
    PromosService,
    GeolocationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
