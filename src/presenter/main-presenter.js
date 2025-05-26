import {render, remove} from '../framework/render.js';
import {sortByDay, sortByPrice, sortByDuration} from '../utils.js';
import {SORT_TYPES, UPDATE_TYPES, USER_ACTION, FILTERS, FILTER_TYPES} from '../const.js';
import Sorting from '../view/sorting-view.js';
import RoutePointList from '../view/route-point-list-view.js';
import EmptyPointList from '../view/empty-task-list-view.js';
import PointsModel from '../model/points-model.js';
import OffersModel from '../model/offers-model.js';
import DestinationsModel from '../model/destinations-model.js';
import FiltersModel from '../model/filters-model.js';
import TaskPresenter from '../presenter/point-presenter.js';
import FilterPresenter from './filter-presenter.js';
import NewTaskPresenter from './new-point-presenter.js';


export default class Presenter {
  #routePointListElement = null;
  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #filterModel = null;
  #filterType = null;
  #tripEvents = null;
  #sortComponent = null;
  #filterComponent = null;
  #currentSortType = SORT_TYPES[0];

  #pointsArrayInitial = [];
  #pointsArray = [];
  #filteredPointsArray = [];
  #offersArray = [];
  #destinationsArray = [];

  #pointPresenters = new Map();


  constructor() {
    this.#tripEvents = document.querySelector('.trip-events');
    this.#routePointListElement = new RoutePointList();
    this.#pointsModel = new PointsModel();
    this.#offersModel = new OffersModel();
    this.#destinationsModel = new DestinationsModel();
    this.#filterModel = new FiltersModel();

    this.#pointsModel.addObserver(this.#handleModelEventChange);
    this.#filterModel.addObserver(this.#handleModelEventChange);
  }


  init() {
    this.#pointsArrayInitial = [...this.#pointsModel.getPoints()];
    this.#offersArray = [...this.#offersModel.getOffers()];
    this.#destinationsArray = [...this.#destinationsModel.getDestinations()];

    this.#renderBoard();
  }


  createPoint() {
    this.#currentSortType = SORT_TYPES[0];
    this.#filterModel.setFilter(UPDATE_TYPES.MAJOR, FILTER_TYPES.EVERYTHING);
    this.#renderNewPoint();
  }

  #renderNewPoint() {
    const newTaskComponent = new NewTaskPresenter(
      this.#destinationsArray,
      this.#offersArray,
      this.#routePointListElement.element,
      this.#handlePointDataChange
    );

    newTaskComponent.init();
  }

  #renderPointTask(point, offer, destination) {
    const taskPresenter = new TaskPresenter(
      offer,
      destination,
      this.#destinationsArray,
      this.#offersArray,
      this.#routePointListElement.element,
      this.#handleModeChange,
      this.#handlePointDataChange
    );

    taskPresenter.init(point);
    this.#pointPresenters.set(point.id, taskPresenter);
  }

  #renderFilterComponent() {
    this.#filterComponent = new FilterPresenter({
      filterModel: this.#filterModel,
      pointsModel: this.#pointsModel
    });

    this.#filterComponent.init();
  }


  #renderBoard() {
    if (this.#pointsArrayInitial.length > 0) {
      this.#renderFilterComponent();

      this.#sortComponent = new Sorting({sortType: this.#currentSortType, onSortTypeChange: this.#handleSortTypeChange});
      this.#sortWaypoints();
      render(this.#sortComponent, this.#tripEvents);
      render(this.#routePointListElement, this.#tripEvents);

      for (let i = 0; i < this.#filteredPointsArray.length; i++) {
        this.#renderPointTask(this.#filteredPointsArray[i], this.#offersArray[i],
          this.#destinationsArray[i]);
      }
    } else {
      render(new EmptyPointList(), this.#tripEvents);
    }
  }


  #sortWaypoints() {
    this.#filterType = this.#filterModel.filter;
    this.#pointsArray = [...this.#pointsModel.getPoints()];

    this.#filteredPointsArray = FILTERS[this.#filterType](this.#pointsArray);

    switch(this.#currentSortType) {
      case SORT_TYPES[0]:
        this.#filteredPointsArray.sort(sortByDay);
        break;
      case SORT_TYPES[2]:
        this.#filteredPointsArray.sort(sortByDuration);
        break;
      case SORT_TYPES[3]:
        this.#filteredPointsArray.sort(sortByPrice);
        break;
      default:
        break;
    }
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortWaypoints();
    this.#currentSortType = sortType;
    this.#clearListView();
    this.#renderBoard();
  };

  #clearListView() {
    this.#pointPresenters.forEach((pointPresenter) => {
      pointPresenter.destroy();
    });
    this.#pointPresenters.clear();
    remove(this.#sortComponent);
    remove(this.#routePointListElement);
    this.#filterComponent.destroy();
  }


  #handleModeChange = () => {
    this.#pointPresenters.forEach((pointPresenter) => pointPresenter.resetView());
  };

  #handlePointDataChange = (actionType, updateType, updatedPoint) => {
    switch (actionType) {
      case USER_ACTION.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, updatedPoint);
        break;
      case USER_ACTION.ADD_POINT:
        this.#pointsModel.addPoint(updateType, updatedPoint);
        break;
      case USER_ACTION.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, updatedPoint);
        break;
    }
  };

  #handleModelEventChange = (updateType, updatedPoint) => {
    switch(updateType) {
      case UPDATE_TYPES.PATCH:
        this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
        break;
      case UPDATE_TYPES.MINOR:
        this.#clearListView();
        this.init();
        break;
      case UPDATE_TYPES.MAJOR:
        this.#currentSortType = SORT_TYPES[0];
        this.#sortWaypoints();
        this.#clearListView();
        this.init();
        break;
    }
  };
}
