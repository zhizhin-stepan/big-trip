import {render, replace, remove} from '../framework/render.js';
import {FILTER_TYPES, FILTERS, UPDATE_TYPES} from '../const.js';
import Filters from '../view/filters-view';


export default class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #pointsModel = null;
  #filterComponent = null;

  #pointsArray = [];

  constructor({filterModel, pointsModel}) {
    this.#filterContainer = document.querySelector('.trip-controls__filters');
    this.#filterModel = filterModel;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModelFilterChange);
    this.#filterModel.addObserver(this.#handleModelFilterChange);
  }

  get filters() {
    this.#pointsArray = [...this.#pointsModel.getPoints()];
    return Object.values(FILTER_TYPES).map((type) => ({
      type,
      points: FILTERS[type](this.#pointsArray)
    }));
  }

  init() {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new Filters({
      filters,
      onFilterTypeChange: this.#handleFilterTypeChange
    });

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  destroy() {
    remove(this.#filterComponent);
  }


  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UPDATE_TYPES.MAJOR, filterType);
  };

  #handleModelFilterChange = () => {
    this.init();
  };
}
