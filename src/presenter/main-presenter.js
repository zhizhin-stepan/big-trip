import {render, replace} from '../framework/render.js';
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
  #routePointListElement = null;
  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;

  #pointsArray = [];
  #offersArray = [];
  #destinationsArray = [];

  constructor() {
    this.tripControlFilters = document.querySelector('.trip-controls__filters');
    this.tripEvents = document.querySelector('.trip-events');
    this.#routePointListElement = new RoutePointList();
    this.#pointsModel = new PointsModel();
    this.#offersModel = new OffersModel();
    this.#destinationsModel = new DestinationsModel();
  }


  init() {
    this.#pointsArray = [...this.#pointsModel.getPoints()];
    this.#offersArray = [...this.#offersModel.getOffers()];
    this.#destinationsArray = [...this.#destinationsModel.getDestinations()];

    this.#renderBoard();
  }


  #renderBoard() {
    render(new Filters(), this.tripControlFilters);
    render(new Sorting(), this.tripEvents);
    render(this.#routePointListElement, this.tripEvents);

    for (let i = 0; i < this.#pointsArray.length; i++) {
      this.#renderPointTask(this.#pointsArray[i], this.#offersArray[i],
        this.#destinationsArray[i]);
    }

    render(new FormCreation(), this.#routePointListElement.element);
  }


  #renderPointTask(point, offer, destination) {
    const escKeyHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceEditToTask();
        document.removeEventListener('keydown', escKeyHandler);
      }
    };

    const pointTask = new RoutePointElement({
      point,
      offer,
      destination,
      onEditClick: () => {
        replaceTaskToEdit();
        document.addEventListener('keydown', escKeyHandler);
      }
    });

    const pointEdit = new FromEditing({
      point,
      offer,
      destination,
      onTaskClick: () => {
        replaceEditToTask();
        document.removeEventListener('keydown', escKeyHandler);
      }
    });

    function replaceEditToTask () {
      replace(pointTask, pointEdit);
    }

    function replaceTaskToEdit () {
      replace(pointEdit, pointTask);
    }

    render(pointTask, this.#routePointListElement.element);
  }
}
