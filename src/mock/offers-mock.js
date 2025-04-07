import {getRandomValue} from '../utils.js';

const MIN_PRICE = 100;
const MAX_PRICE = 1500;

export const offersElementsMock = [
  {
    'type': 'taxi',
    'offers': [
      {
        'id': '1',
        'title': 'Drive faster!',
        'price': getRandomValue(MIN_PRICE, MAX_PRICE)
      },
      {
        'id': '2',
        'title': 'Drive a little bit slowly.',
        'price': getRandomValue(MIN_PRICE, MAX_PRICE)
      },
      {
        'id': '3',
        'title': 'Choose the radio station.',
        'price': getRandomValue(MIN_PRICE, MAX_PRICE)
      },
      {
        'id': '4',
        'title': 'Open the door before and after.',
        'price': getRandomValue(MIN_PRICE, MAX_PRICE)
      }
    ]
  },
  {
    'type': 'sightseeing',
    'offers': [
      {
        'id': '1',
        'title': 'Modern sights mostly.',
        'price': getRandomValue(MIN_PRICE, MAX_PRICE)
      },
      {
        'id': '2',
        'title': 'A way without lots of people.',
        'price': getRandomValue(MIN_PRICE, MAX_PRICE)
      }
    ]
  },
  {
    'type': 'check-in',
    'offers': [
      {
        'id': '1',
        'title': 'Choose the time of check-in.',
        'price': getRandomValue(MIN_PRICE, MAX_PRICE)
      },
      {
        'id': '2',
        'title': 'Choose the time of check-out.',
        'price': getRandomValue(MIN_PRICE, MAX_PRICE)
      },
      {
        'id': '3',
        'title': 'Add breakfast.',
        'price': getRandomValue(MIN_PRICE, MAX_PRICE)
      }
    ]
  },
  {
    'type': 'flight',
    'offers': []
  }
];
