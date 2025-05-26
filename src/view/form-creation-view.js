import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { TIME_FORMATS, EVENT_TYPES} from '../const';
import { formatDate } from '../utils';
import flatpickr from 'flatpickr';
import he from 'he';


function createFormCreationTemplate (point) {
  const {dateFrom : dateFrom, dateTo: dateTo, basePrice: basePrice, type: type, offers: offers, destination: name, description: description} = point;

  const eventTypes = EVENT_TYPES
    .map((event) =>
      `<div class="event__type-item">
        <input id="event-type-${event}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${event}"
          ${event === type ? 'checked' : ''}>
        <label class="event__type-label  event__type-label--${event}" for="event-type-${event}-1">
          ${event.charAt(0).toUpperCase() + event.slice(1)}</label>
      </div>`
    )
    .join('');

  const offersList = offers
    .map((offerElement) => {
      const checked = offers.includes(offerElement.id) ? 'cheacked' : '';
      const offerName = offerElement.title.toLowerCase().split(' ').join('-');

      return `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offerName}-${offerElement.id}" type="checkbox" name="event-offer-${offerName}" ${checked}>
      <label class="event__offer-label" for="event-offer-${offerName}-${offerElement.id}">
        <span class="event__offer-title">${offerElement.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offerElement.price}</span>
      </label>
    </div>`;
    })
    .join('');


  return `<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${type ? type : 'flight'}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                        ${eventTypes}
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${type ? type : 'Flight'}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${name ? name : ''}" list="destination-list-1">
                    <datalist id="destination-list-1">
                      <option value="Paris"></option>
                      <option value="Amsterdam"></option>
                      <option value="Barcelona"></option>
                      <option value="Dublin"></option>
                      <option value="Vienna"></option>
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateFrom ? formatDate(dateFrom, TIME_FORMATS['FULL_DATE']) : ''}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateTo ? formatDate(dateTo, TIME_FORMATS['FULL_DATE']) : ''}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice ? he.encode(basePrice) : '0'}" required>
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit" ${(basePrice > 0 && dateFrom !== '' && dateTo !== '' && name !== '') ? '' : 'disabled'}>Save</button>
                  <button class="event__reset-btn" type="reset">Delete</button>
                </header>
                <section class="event__details">
                  ${offersList.length > 0 ? `<section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                    <div class="event__available-offers">
                      ${offersList}
                    </div>
                  </section>` : ''}

                  ${description !== '' ? `<section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${description}</p>
                  </section>` : ''}
                </section>
              </form>
            </li>`;
}

export default class FormCreation extends AbstractStatefulView {
  #allDestinations = null;
  #allOffers = null;
  #formHandle = null;
  #deleteHandle = null;
  #datepickerStart = null;
  #datepickerEnd = null;

  constructor({allDestinations, allOffers, onFormSubmit, onDeleteClick}) {
    super();
    this.#allDestinations = allDestinations;
    this.#allOffers = allOffers;
    this._setState({
      basePrice: 0,
      dateFrom: '',
      dateTo: '',
      destination: '',
      description: '',
      offers: [],
      type: ''
    });
    this.#formHandle = onFormSubmit;
    this.#deleteHandle = onDeleteClick;

    this._restoreHandlers();
  }

  get template() {
    return createFormCreationTemplate(this._state);
  }

  _restoreHandlers() {
    this.element.querySelector('.event').addEventListener('submit', this.#formHandlerSubmit);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#deleteHandlerClick);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#pointTypeHandlerChange);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationHandlerChange);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#priceHandlerChange);

    this.#setDatePickerStart();
    this.#setDatePickerEnd();
  }

  #pointTypeHandlerChange = (evt) => {
    evt.preventDefault();
    const targetType = evt.target.value;
    const typeOffers = this.#allOffers.find((offers) => offers.type === targetType);
    this.updateElement({
      offers: typeOffers.offers,
      type: targetType
    });
  };

  #destinationHandlerChange = (evt) => {
    evt.preventDefault();
    const targetDestination = evt.target.value;
    const newDestination = this.#allDestinations.find((destination) => destination.name === targetDestination);

    if (!newDestination) {
      evt.target.value = '';
      this.updateElement({
        destination: '',
        description: ''
      });
      return;
    }

    this.updateElement({
      destination: newDestination.name,
      description: newDestination.description
    });
  };

  #priceHandlerChange = (evt) => {
    evt.preventDefault();
    const newPrice = evt.target.value;

    if (isNaN(newPrice)) {
      evt.target.value = '0';
      this.updateElement({
        basePrice: '0'
      });
      return;
    }

    this.updateElement({
      basePrice: newPrice
    });
  };

  #dateFromHandlerChange = ([newDateFrom]) => {
    this.updateElement({
      dateFrom: newDateFrom
    });
  };

  #dateToHandlerChange = ([newDateTo]) => {
    this.updateElement({
      dateTo: newDateTo
    });
  };

  #setDatePickerStart() {
    this.#datepickerStart = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        'time_24hr': true,
        defaultDate: this._state.dateForm,
        onChange: this.#dateFromHandlerChange,
        maxDate: this._state.dateTo,
      }
    );
  }

  #setDatePickerEnd() {
    this.#datepickerEnd = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        'time_24hr': true,
        defaultDate: this._state.dateTo,
        onChange: this.#dateToHandlerChange,
        minDate: this._state.dateFrom,
      }
    );
  }


  #formHandlerSubmit = (evt) => {
    evt.preventDefault();
    this.#formHandle(FormCreation.parseStateToPoint(this._state));
  };

  #deleteHandlerClick = (evt) => {
    evt.preventDefault();
    this.#deleteHandle(FormCreation.parseStateToPoint(this._state));
  };


  static parseStateToPoint(state) {
    const point = {...state};

    if (!point.description) {
      point.description = null;
    }

    delete point.description;
    return point;
  }
}
