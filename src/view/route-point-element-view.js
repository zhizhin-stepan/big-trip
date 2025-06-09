import AbstractView from '../framework/view/abstract-view.js';
import { TIME_FORMATS } from '../const';
import { formatDate, formatDuration } from '../utils';


function creatRoutePointElementTemplate (point, offer, destination) {
  const {name: name} = destination;
  const {type, offers} = offer;
  const {dateFrom : dateFrom, dateTo: dateTo, basePrice: basePrice, isFavorite: isFavorite} = point;

  const offersList = offers
    .map((offerElement) => {
      const offerPrice = offerElement.price;
      const offerTitle = offerElement.title.toLowerCase().split(' ').join('-');

      return `<li class="event__offer">
      <span class="event__offer-title">${offerTitle}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offerPrice}</span>
    </li>`;
    })
    .join('');

  const favoriteCheck = isFavorite
    ? '--active'
    : '';

  return `<li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="${formatDate(dateFrom, TIME_FORMATS['TIME_TAG_VALUE'])}">${formatDate(dateFrom, TIME_FORMATS['DAY'])}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${type} ${name}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="${dateFrom}">${formatDate(dateFrom, TIME_FORMATS['TIME'])}</time>
                    &mdash;
                    <time class="event__end-time" datetime=""${dateTo}">${formatDate(dateTo, TIME_FORMATS['TIME'])}</time>
                  </p>
                  <p class="event__duration">${formatDuration(dateFrom, dateTo)}</p>
                </div>
                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
                </p>
                <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">
                  ${offersList}
                </ul>
                <button class="event__favorite-btn  event__favorite-btn${favoriteCheck}" type="button">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>`;
}

export default class RoutePointElement extends AbstractView{
  #point = null;
  #offer = null;
  #destination = null;
  #editHandle = null;
  #favoriteHandle = null;

  constructor({point, offer, destination, onEditClick, onFavoriteClick}) {
    super();
    this.#point = point;
    this.#offer = offer;
    this.#destination = destination;
    this.#editHandle = onEditClick;
    this.#favoriteHandle = onFavoriteClick;

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editHadlerClick);
    this.element.querySelector('.event__favorite-icon').addEventListener('click', this.#favoriteHandlerClick);
  }

  get template() {
    return creatRoutePointElementTemplate(this.#point, this.#offer, this.#destination);
  }

  #editHadlerClick = (evt) => {
    evt.preventDefault();
    this.#editHandle();
  };

  #favoriteHandlerClick = (evt) => {
    evt.preventDefault();
    this.#favoriteHandle();
  };
}
