import { offersElementsMock } from '../mock/offers-mock';


export default class OffersModel {
  constructor() {
    this.offers = [...offersElementsMock];
  }

  getOffers() {
    return this.offers;
  }
}
