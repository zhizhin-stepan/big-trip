import AbstractView from '../framework/view/abstract-view.js';


function createEmptyPointListTemplate() {
  return '<p class="trip-events__msg">Click New Event to create your first point</p>';
}

export default class EmptyPointList extends AbstractView{
  get template() {
    return createEmptyPointListTemplate();
  }
}

