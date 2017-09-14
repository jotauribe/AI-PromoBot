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
        '/assets/images//home/girl1.jpg',
        'Dos por uno',
        new Shop('El factor X', 95.0789, 80.0789)),
      new Promotion(
        '/assets/images//home/girl1.jpg',
        'Tres por uno',
        new Shop('La tienda mami', 57.0890, 79.0789)),
      new Promotion(
        '/assets/images/promo/promo1.png',
        'Cuatro por uno',
        new Shop('La tienda pachangosa', 50.0890, 80.0789)),
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
            console.log('La distancia más corta :' + this.minDistance);
            console.log('La mejor promo :' + this.bestPromo.imageURL);
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
              console.log('prueba' + distance);
              if (this.minDistance > distance) {
                this.minDistance = distance;
                this.bestPromo = promo;
                // console.log('this ' + this.minDistance);
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
