import { destinationsElementsMock } from '../mock/destinations-mock';


export default class DestinationsModel {
  constructor() {
    this.destinations = [...destinationsElementsMock];
  }

  getDestinations() {
    return this.destinations;
  }
}
