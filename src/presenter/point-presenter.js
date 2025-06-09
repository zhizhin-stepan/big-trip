import {render, replace, remove} from '../framework/render.js';
import RoutePointElement from '../view/route-point-element-view.js';
import FromEditing from '../view/form-editing-view.js';
import {MODE, USER_ACTION, UPDATE_TYPES} from '../const.js';


export default class TaskPresenter {
  #point = null;
  #offer = null;
  #destination = null;
  #allDestinations = null;
  #allOffers = null;
  #mode = MODE.DEFAULT;

  #pointTask = null;
  #pointEdit = null;
  #pointsListComponent = null;

  #handleModeChange = null;
  #handleDataChange = null;

  #escKeyHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#pointEdit.reset();
      this.#replaceEditToTask();
      document.removeEventListener('keydown', this.#escKeyHandler);
    }
  };

  constructor(allDestinations, allOffers, pointsListComponent, onModeChange, onDataChange) {
    this.#allDestinations = allDestinations;
    this.#allOffers = allOffers;
    this.#pointsListComponent = pointsListComponent;
    this.#handleModeChange = onModeChange;
    this.#handleDataChange = onDataChange;
  }

  init(point) {
    this.#point = point;
    this.#offer = this.#allOffers.find((offer) => offer.type === point.type ? offer : null);
    this.#destination = this.#allDestinations.find((destination) => destination.id === point.destination ? destination : null);


    const prevPointComponent = this.#pointTask;
    const prevEditFormComponent = this.#pointEdit;

    this.#pointTask = new RoutePointElement({
      point: this.#point,
      offer: this.#offer,
      destination: this.#destination,
      onEditClick: () => {
        this.#replaceTaskToEdit();
        document.addEventListener('keydown', this.#escKeyHandler);
      },
      onFavoriteClick: () => {
        this.#addPointToFavorite();
      }
    });

    this.#pointEdit = new FromEditing({
      point: this.#point,
      offer: this.#offer,
      destination: this.#destination,
      allDestinations: this.#allDestinations,
      allOffers: this.#allOffers,
      onRollupClick: () => {
        this.#pointEdit.reset();
        this.#replaceEditToTask();
        document.removeEventListener('keydown', this.#escKeyHandler);
      },
      onFormSubmit: (newPoint) => {
        this.#handleDataChange(USER_ACTION.UPDATE_POINT, UPDATE_TYPES.PATCH, {...newPoint});
        this.#replaceEditToTask();
      },
      onDeleteClick: (currentPoint) => {
        this.#handleDataChange(USER_ACTION.DELETE_POINT, UPDATE_TYPES.MINOR, {...currentPoint});
      }
    });


    if (prevPointComponent === null || prevEditFormComponent === null) {
      render(this.#pointTask, this.#pointsListComponent);
      return;
    }

    if (this.#mode === MODE.DEFAULT) {
      replace(this.#pointTask, prevPointComponent);
    }

    if (this.#mode === MODE.EDITING) {
      replace(this.#pointEdit, prevEditFormComponent);
    }

    remove(prevPointComponent);
    remove(prevEditFormComponent);
  }

  destroy() {
    remove(this.#pointTask);
    remove(this.#pointEdit);
  }

  resetView() {
    if (this.#mode !== MODE.DEFAULT) {
      this.#replaceEditToTask();
    }
  }

  setSaving() {
    if (this.#mode === MODE.EDITING) {
      this.#pointEdit.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  }

  setDeleting() {
    if (this.#mode === MODE.EDITING) {
      this.#pointEdit.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  }

  setAborting() {
    if (this.#mode === MODE.DEFAULT) {
      this.#pointTask.shake();
      return;
    }

    const resetFormState = () => {
      this.#pointEdit.updateElement({
        isDisabled: false,
        isDeleting: false,
        isSaving: false,
      });
    };

    this.#pointEdit.shake(resetFormState);
  }


  #replaceTaskToEdit() {
    replace(this.#pointEdit, this.#pointTask);
    this.#handleModeChange();
    this.#mode = MODE.EDITING;
  }

  #replaceEditToTask() {
    replace(this.#pointTask, this.#pointEdit);
    this.#mode = MODE.DEFAULT;
  }

  #addPointToFavorite = () => {
    this.#handleDataChange(USER_ACTION.UPDATE_POINT, UPDATE_TYPES.PATCH, {...this.#point, isFavorite: !this.#point.isFavorite});
  };
}
