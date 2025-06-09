
import Observable from '../framework/observable';


export default class DestinationsModel extends Observable{
  #destinations = null;
  #pointsApiService = null;

  constructor({pointsApiService}) {
    super();
    this.#pointsApiService = pointsApiService;

  }

  getDestinations() {
    return this.#destinations;
  }

  async init() {
    try {
      this.#destinations = await this.#pointsApiService.destinations;
    } catch(err) {
      this.#destinations = [];
    }
  }
}
