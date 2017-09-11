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
        new Shop('La tienda pachangosa', 95.0789, 80.0789)),
      new Promotion(
        '/assets/images//home/girl1.jpg',
        'Dos por uno',
        new Shop('La tienda pachangosa', 57.0890, 79.0789)),
      new Promotion(
        '/assets/images/promo/promo1.png',
        'Dos por uno',
        new Shop('La tienda pachangosa', 50.0890, 80.0789)),
    ];
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
