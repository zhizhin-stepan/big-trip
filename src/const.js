import {isPointPresent, isPointPast, isPointFuture} from './utils.js';


const EVENT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const TIME_FORMATS = {TIME: 'HH:mm', DAY: 'MMM D', FULL_DATE: 'D/MM/YY HH:mm', TIME_TAG_VALUE: 'YYYY-MM-DD'};

const TIME_SUFFIXES = ['D', 'H', 'M'];


const FILTER_TYPES = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

const EMPTY_LIST_TEXT_TYPE = {
  [FILTER_TYPES.EVERYTHING]: 'Click New Event to create your first point',
  [FILTER_TYPES.FUTURE]: 'There are no future events now',
  [FILTER_TYPES.PRESENT]: 'There are no present events now',
  [FILTER_TYPES.PAST]: 'There are no past events now',
};

const FILTERS = {
  [FILTER_TYPES.EVERYTHING]: (points) => [...points],
  [FILTER_TYPES.FUTURE]: (points) => points.filter((point) => isPointFuture(point)),
  [FILTER_TYPES.PRESENT]: (points) => points.filter((point) => isPointPresent(point)),
  [FILTER_TYPES.PAST]: (points) => points.filter((point) => isPointPast(point))
};

const MODE = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};

const SORT_TYPES = [
  'day',
  'event',
  'time',
  'price',
  'offers'
];

const CITIES = ['Paris', 'Amsterdam', 'Barcelona', 'Dublin', 'Vienna'];

const UPDATE_TYPES = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
  ABORT: 'ABORT',
};

const USER_ACTION = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const METHOD = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

const AUTHORIZATION = 'Basic er228jdzbdw';

const END_POINT = 'https://24.objects.htmlacademy.pro/big-trip';

const TIME_LIMIT = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};


export {EVENT_TYPES, TIME_FORMATS, TIME_SUFFIXES, FILTER_TYPES, EMPTY_LIST_TEXT_TYPE, FILTERS, MODE, SORT_TYPES, CITIES, UPDATE_TYPES, USER_ACTION, METHOD, AUTHORIZATION, END_POINT, TIME_LIMIT};
