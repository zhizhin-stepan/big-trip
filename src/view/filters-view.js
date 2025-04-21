import AbstractView from '../framework/view/abstract-view.js';


function createFiltersTemplate (filterItems) {

  const filtersList = filterItems
    .map((filter) => {
      const type = filter.type;
      const count = filter.count;

      return `<div class="trip-filters__filter">
                  <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio"
                  name="trip-filter" value="${type}" ${count === 0 ? 'disabled' : ''}>
                  <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
                </div>`;
    })
    .join('');

  return `<form class="trip-filters" action="#" method="get">
                ${filtersList}
                <button class="visually-hidden" type="submit">Accept filter</button>
              </form>`;
}

export default class Filters extends AbstractView {
  #filters = null;

  constructor(filters) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFiltersTemplate(this.#filters);
  }
}
