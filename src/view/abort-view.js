import AbstractView from '../framework/view/abstract-view.js';

function createAbortTemplate() {
  return (
    '<p class="trip-events__msg">Failed to load latest route information</p>'
  );
}

export default class AbortView extends AbstractView {
  get template() {
    return createAbortTemplate();
  }
}
