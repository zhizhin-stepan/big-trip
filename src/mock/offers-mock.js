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
    type: 'bus',
    offers: [
      {
        id: '1',
        title: 'Priority seating selection',
        price: getRandomValue(MIN_PRICE, MAX_PRICE)
      },
      {
        id: '2',
        title: 'Air conditioning guaranteed',
        price: getRandomValue(MIN_PRICE, MAX_PRICE)
      },
      {
        id: '3',
        title: 'Extra luggage space',
        price: getRandomValue(MIN_PRICE, MAX_PRICE)
      }
    ]
  },
  {
    type: 'train',
    offers: [
      {
        id: '1',
        title: 'First class compartment',
        price: getRandomValue(MIN_PRICE, MAX_PRICE)
      },
      {
        id: '2',
        title: 'Dining car access',
        price: getRandomValue(MIN_PRICE, MAX_PRICE)
      },
      {
        id: '3',
        title: 'Private cabin upgrade',
        price: getRandomValue(MIN_PRICE, MAX_PRICE)
      }
    ]
  },
  {
    type: 'ship',
    offers: [
      {
        id: '1',
        title: 'Cabin with ocean view',
        price: getRandomValue(MIN_PRICE, MAX_PRICE)
      },
      {
        id: '2',
        title: 'VIP deck access',
        price: getRandomValue(MIN_PRICE, MAX_PRICE)
      },
      {
        id: '3',
        title: 'Fishing equipment rental',
        price: getRandomValue(MIN_PRICE, MAX_PRICE)
      }
    ]
  },
  {
    type: 'drive',
    offers: [
      {
        id: '1',
        title: 'Car insurance included',
        price: getRandomValue(MIN_PRICE, MAX_PRICE)
      },
      {
        id: '2',
        title: 'GPS navigation system',
        price: getRandomValue(MIN_PRICE, MAX_PRICE)
      },
      {
        id: '3',
        title: 'Child seat rental',
        price: getRandomValue(MIN_PRICE, MAX_PRICE)
      }
    ]
  },
  {
    'type': 'flight',
    'offers': []
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
    type: 'restaurant',
    offers: [
      {
        id: '1',
        title: 'Window table reservation',
        price: getRandomValue(MIN_PRICE, MAX_PRICE)
      },
      {
        id: '2',
        title: 'Chef\'s special menu',
        price: getRandomValue(MIN_PRICE, MAX_PRICE)
      },
      {
        id: '3',
        title: 'Wine pairing selection',
        price: getRandomValue(MIN_PRICE, MAX_PRICE)
      }
    ]
  }
];
