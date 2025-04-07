import {render} from '../render.js';
import Filters from '../view/filters-view.js';
import Sorting from '../view/sorting-view.js';
import RoutePointList from '../view/route-point-list-view.js';
import FromEditing from '../view/form-editing-view.js';
import FormCreation from '../view/form-creation-view.js';
import RoutePointElement from '../view/route-point-element-view.js';
import PointsModel from '../model/points-model.js';
import OffersModel from '../model/offers-model.js';
import DestinationsModel from '../model/destinations-model.js';


export default class Presenter {
  constructor() {
    this.tripControlFilters = document.querySelector('.trip-controls__filters');
    this.tripEvents = document.querySelector('.trip-events');
    this.routePointListElement = new RoutePointList();
    this.pointsModel = new PointsModel();
    this.offersModel = new OffersModel();
    this.destinationsModel = new DestinationsModel();
  }

  init() {
    this.pointsArray = [...this.pointsModel.getPoints()];
    this.offersArray = [...this.offersModel.getOffers()];
    this.destinationsModel = [...this.destinationsModel.getDestinations()];

    render(new Filters(), this.tripControlFilters);
    render(new Sorting(), this.tripEvents);
    render(this.routePointListElement, this.tripEvents);
    render(new FromEditing(this.pointsArray[0], this.offersArray[0],
      this.destinationsModel[0]), this.routePointListElement.getElement());

    for (let i = 0; i < this.pointsArray.length; i++) {
      render(new RoutePointElement(this.pointsArray[i], this.offersArray[i],
        this.destinationsModel[i]), this.routePointListElement.getElement());
    }

    render(new FormCreation(), this.routePointListElement.getElement());
  }
}
