import { Injectable } from '@angular/core';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';

@Injectable()
export class GeolocationService {

  public longitude;
  public latitude;

  constructor(private mapAPILoader: MapsAPILoader) { }

  computeDistanceFromCurrentPosition(latitude: number,
                                     longitude: number): Promise<number> {
    return new Promise((resolve, reject) => {
      this.getUserLocation()
        .then( position => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.latitude;
          // distance = this.init(latitude, longitude);
          this.init(latitude, longitude)
            .then(distance => {
              resolve(distance);
            });
        });

    });
  }

  getUserLocation(): Promise<Position> {
    return new Promise(function (resolve, reject) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          resolve(position);
        }, function (error) {
          reject(error);
        });
      }
    });
  }

  init(latitude: number, longitude: number) {

    return new Promise((resolve, reject) => {
      this.mapAPILoader.load()
        .then(() => {
          const currentLatLng = new google.maps.LatLng(
            this.latitude,
            this.longitude
          );
          const anotherLatLng = new google.maps.LatLng(
            latitude,
            longitude
          );
          const distance = google.maps.geometry.spherical.computeDistanceBetween(
            currentLatLng,
            anotherLatLng);
          console.log('distancia calculada bien ' + distance + 'KM');
          resolve(distance);
        });
    });
  }
}
