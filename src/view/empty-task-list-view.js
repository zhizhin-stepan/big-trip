import {FILTER_TYPES, EMPTY_LIST_TEXT_TYPE} from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';


function createEmptyPointListTemplate(filterType) {
  const text = EMPTY_LIST_TEXT_TYPE[filterType] || EMPTY_LIST_TEXT_TYPE[FILTER_TYPES.EVERYTHING];

  return `<p class="trip-events__msg">${text}</p>`;
}

export default class EmptyPointList extends AbstractView{
  #filterType = FILTER_TYPES.EVERYTHING;

  constructor({ filterType } = {}) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createEmptyPointListTemplate(this.#filterType);
  }
}

