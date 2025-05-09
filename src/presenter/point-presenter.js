import {render, replace, remove} from '../framework/render.js';
import RoutePointElement from '../view/route-point-element-view.js';
import FromEditing from '../view/form-editing-view.js';
import {MODE} from '../const.js';


export default class TaskPresenter {
  #point = null;
  #offer = null;
  #destination = null;
  #mode = MODE.DEFAULT;

  #pointTask = null;
  #pointEdit = null;
  #pointsListComponent = null;

  #handleModeChange = null;
  #handleDataChange = null;

  #escKeyHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceEditToTask();
      document.removeEventListener('keydown', this.#escKeyHandler);
    }
  };

  constructor(offer, destination, pointsListComponent, onModeChange, onDataChange) {
    this.#offer = offer;
    this.#destination = destination;
    this.#pointsListComponent = pointsListComponent;
    this.#handleModeChange = onModeChange;
    this.#handleDataChange = onDataChange;
  }

  init(point) {
    this.#point = point;

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
      onTaskClick: () => {
        this.#replaceEditToTask();
        document.removeEventListener('keydown', this.#escKeyHandler);
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


  resetView() {
    if (this.#mode !== MODE.DEFAULT) {
      this.#replaceEditToTask();
    }
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
    this.#handleDataChange({...this.#point, isFavorite: !this.#point.isFavorite});
  };
}
