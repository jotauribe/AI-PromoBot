import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Promotion, Shop} from "../components/promotion/promotion.model";
import {GeolocationService} from "./geolocation.service";

@Injectable()
export class PromosService {

  private minDistance: number;
  private bestPromo: Promotion;

  constructor(private geolocationService: GeolocationService) {
    this.minDistance = 100000000000;
  }

  getPromotions(): Promotion[] {
    return [
      new Promotion(
        'http://images03.spotzot.com/static/September/9132017/150529776207/kohls_170913_vc_01_m.png?aid=5100110509?api_key=mjj111nf579wed09&aff_id=5100110509&dealid=4755384',
        'Muchos descuentos de tu ropa favorita',
        new Shop('El factor X', 20.4039989, -75.5300293)),
      new Promotion(
        'https://www.advertgallery.com/wp-content/uploads/2016/04/brand-factory-toi-mum-8-4-2016.jpg',
        'Mega promoción GUESS',
        new Shop('La tienda mami', 10.0790, -75.0589)),
      new Promotion(
        'https://i2.wp.com/www.blackerfriday.com/wp-content/uploads/2015/10/Ann-Taylor-Black-Friday-Ad-Page-12.png',
        'Amor y amistad !50% Descuento ',
        new Shop('La tienda pachangosa', 50.0990, -70.0789)),
    ];
  }

  getTheProm(): Promise<Promotion> {
    return new Promise((resolve) => {
      const promos =  this.getPromotions();
      this.geolocationService.getUserLocation()
        .then(position => {
          const currentPosition = position;
          let bestPromo: Promotion = promos[0];
          let minimunDistance = Number.MAX_VALUE;
          promos.forEach(p => {
            const distance = this.getDistanceFromLatLonInKm(
              bestPromo.shop.latitude,
              bestPromo.shop.longitude,
              currentPosition.coords.latitude,
              currentPosition.coords.longitude);
            if (minimunDistance > distance) {
              minimunDistance = distance;
              bestPromo = p;
            }
          });
          resolve (bestPromo);
        });
    });
  }

  getBestPromo(): Promise<Promotion> {
    return new Promise((resolve, reject) => {
      this.findClosestPromo(this.getPromotions())
        .then(distance => {
          setTimeout( () => {
            // console.log('La distancia más corta :' + this.minDistance);
            // console.log('Best Promo name ' + this.bestPromo.description);
            resolve(this.bestPromo);
          }, 1000);
      });
    });
  }

  calculate(currentPromo: Promotion): Promise<number> {
    return new Promise((resolve, reject) => {
      this.geolocationService.computeDistanceFromCurrentPosition(
        currentPromo.shop.latitude,
        currentPromo.shop.longitude
      ).then(distance => {
        resolve(distance);
      });
    });
  }

  findClosestPromo(promos: Promotion[]) {
    return new Promise((resolve, reject) => {
      promos.forEach(promo => {
          this.calculate(promo)
            .then( distance => {
              if (this.minDistance > distance) {
                this.minDistance = distance;
                this.bestPromo = promo;
              }
            });
      });
      resolve();
    });
  }

  getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = this.deg2rad(lat2 - lat1);  // deg2rad below
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  }

  deg2rad (deg) {
    return deg * (Math.PI / 180);
  }

}

class Iterator {
  private index: number;
  private array: any[];
  constructor( array ) {
    if (array.length === 0) {
      throw new Error('Array is empty');
    }
    this.index = 0;
    this.array = array;
  }

  next() {
    if (this.array[this.index]) {
      this.index++;
      return this.array[this.index];
    } else {
      return false;
    }
  }

  hasNext(): boolean {
    if (this.array.length > this.index + 1) {
      return true;
    } else {
      return false;
    }
  }
}
