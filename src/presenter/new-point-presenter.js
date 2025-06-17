import {render, remove, RenderPosition} from '../framework/render.js';
import {USER_ACTION, UPDATE_TYPES} from '../const.js';
import {isEscapeKey} from '../utils.js';
import FormCreation from '../view/form-creation-view.js';

export default class NewTaskPresenter {
  #allDestinations = null;
  #allOffers = null;

  #pointEdit = null;
  #pointsListComponent = null;
  #newPointButtonComponent = null;

  #handleDataChange = null;

  #escKeyHandler = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.destroy();
      this.#newPointButtonComponent.disabled = false;
    }
  };

  constructor(allDestinations, allOffers, pointsListComponent, onDataChange) {
    this.#allDestinations = allDestinations;
    this.#allOffers = allOffers;
    this.#pointsListComponent = pointsListComponent;
    this.#handleDataChange = onDataChange;

    this.#newPointButtonComponent = document.querySelector('.trip-main__event-add-btn');
  }

  init() {
    if (this.#pointEdit !== null) {
      return;
    }

    this.#pointEdit = new FormCreation({
      allDestinations: this.#allDestinations,
      allOffers: this.#allOffers,
      onFormSubmit: (newPoint) => {
        this.#handleDataChange(USER_ACTION.ADD_POINT, UPDATE_TYPES.MINOR, newPoint);
        this.#newPointButtonComponent.disabled = false;
      },
      onDeleteClick: () => {
        this.destroy();
        this.#newPointButtonComponent.disabled = false;
      }
    });

    render(this.#pointEdit, this.#pointsListComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyHandler);
  }

  destroy() {
    if (this.#pointEdit === null) {
      return;
    }

    remove(this.#pointEdit);
    this.#pointEdit = null;

    document.removeEventListener('keydown', this.#escKeyHandler);
  }
}
