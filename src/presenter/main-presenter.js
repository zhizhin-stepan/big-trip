import {render} from '../render.js';
import Filters from '../view/filters-view.js';
import Sorting from '../view/sorting-view.js';
import RoutePointList from '../view/route-point-list-view.js';
import FromEditing from '../view/form-editing-view.js';
import FormCreation from '../view/form-creation-view.js';
import RoutePointElement from '../view/route-point-element-view.js';
const MAX_ROUTE_POINT_ELEMENTS = 3;


export default class Presenter {
  constructor() {
    this.tripControlFilters = document.querySelector('.trip-controls__filters');
    this.tripEvents = document.querySelector('.trip-events');
    this.routePointListElement = new RoutePointList();
  }

  init() {
    render(new Filters(), this.tripControlFilters);
    render(new Sorting(), this.tripEvents);
    render(this.routePointListElement, this.tripEvents);
    render(new FromEditing(), this.routePointListElement.getElement());
    render(new FormCreation(), this.routePointListElement.getElement());

    for (let i = 0; i < MAX_ROUTE_POINT_ELEMENTS; i++) {
      render(new RoutePointElement(), this.routePointListElement.getElement());
    }
  }
}
