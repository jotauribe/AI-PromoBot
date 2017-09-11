export class Promotion {
  constructor(public imageURL: string,
              public description: string,
              public shop: Shop) {

  }
}

export class Shop {
  constructor(public name: string,
              public latitude: number,
              public longitude: number) {

  }
}
