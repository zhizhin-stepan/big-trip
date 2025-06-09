import {UPDATE_TYPES} from '../const';
import Observable from '../framework/observable';


export default class PointsModel extends Observable{
  #points = null;
  #offers = null;
  #destinations = null;
  #pointsApiService = null;

  constructor({pointsApiService}) {
    super();
    this.#pointsApiService = pointsApiService;

  }

  async init() {
    try {
      const points = await this.#pointsApiService.points;
      this.#points = points.map(this.#adaptToClient);
      this.#offers = await this.#pointsApiService.offers;
      this.#destinations = await this.#pointsApiService.destinations;
    } catch(err) {
      this.#points = [];
      this.#offers = [];
      this.#destinations = [];
    }
    this._notify(UPDATE_TYPES.INIT);
  }

  getDestinations() {
    return this.#destinations;
  }

  getOffers() {
    return this.#offers;
  }

  getPoints() {
    return this.#points;
  }

  async updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Cant update unexisting Point');
    }

    try {
      const responce = await this.#pointsApiService.updatePoint(update);
      const updatedPoint = this.#adaptToClient(responce);
      this.#points = [
        ...this.#points.slice(0, index),
        updatedPoint,
        ...this.#points.slice(index + 1),
      ];

      this._notify(updateType, updatedPoint);
    } catch(err) {
      throw new Error('Can\'t update task');
    }
  }

  async addPoint(updateType, update) {
    try {
      const responce = await this.#pointsApiService.addPoint(update);
      const newPoint = this.#adaptToClient(responce);

      this.#points = [
        newPoint,
        ...this.#points,
      ];

      this._notify(updateType, newPoint);
    } catch(err) {
      throw new Error('Can\'t add task');
    }
  }

  async deletePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Cant update unexisting Point');
    }

    try {
      await await this.#pointsApiService.deletePoint(update);

      this.#points = [
        ...this.#points.slice(0, index),
        ...this.#points.slice(index + 1),
      ];

      this._notify(updateType, update);
    } catch(err) {
      throw new Error('Can\'t delete this point');
    }
  }


  #adaptToClient(point) {
    const adaptedPoint = {...point,
      dateFrom: point['date_from'] !== null ? new Date(point['date_from']) :
        new Date(point['date_from']),
      dateTo: point['date_to'] !== null ? new Date(point['date_to']) :
        new Date(point['date_to']),
      basePrice: point['base_price'],
      isFavorite: point['is_favorite'],
    };

    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['base_price'];
    delete adaptedPoint['is_favorite'];

    return adaptedPoint;
  }
}
