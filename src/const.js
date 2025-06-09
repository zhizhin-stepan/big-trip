import {isPointPresent, isPointPast, isPointFuture} from './utils.js';


export const EVENT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

export const TIME_FORMATS = {TIME: 'HH:mm', DAY: 'MMM D', FULL_DATE: 'D/MM/YY HH:mm', TIME_TAG_VALUE: 'YYYY-MM-DD'};

export const TIME_SUFFIXES = ['D', 'H', 'M'];


export const FILTER_TYPES = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

export const FILTERS = {
  [FILTER_TYPES.EVERYTHING]: (points) => [...points],
  [FILTER_TYPES.FUTURE]: (points) => points.filter((point) => isPointFuture(point)),
  [FILTER_TYPES.PRESENT]: (points) => points.filter((point) => isPointPresent(point)),
  [FILTER_TYPES.PAST]: (points) => points.filter((point) => isPointPast(point))
};

export const MODE = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};

export const SORT_TYPES = [
  'day',
  'event',
  'time',
  'price',
  'offers'
];

export const CITIES = ['Paris', 'Amsterdam', 'Barcelona', 'Dublin', 'Vienna'];

export const UPDATE_TYPES = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT'
};

export const USER_ACTION = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

export const METHOD = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

export const AUTHORIZATION = 'Basic er228jdzbdw';

export const END_POINT = 'https://24.objects.htmlacademy.pro/big-trip';

export const TIME_LIMIT = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

