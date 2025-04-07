import dayjs from 'dayjs';
import { TIME_SUFFIXES } from './const';


export const getRandomArrayElement = (array) => {
  const randomELemnt = Math.floor(Math.random() * array.length);

  return array[randomELemnt];
};

export const getRandomValue = (minPrice, maxPrice) => {
  const randomPrice = Math.floor(Math.random() * (maxPrice - minPrice) + minPrice);

  return randomPrice;
};


export const getOffersFromTypes = (eventType, offersElementsArray) => {
  let offersArray = [];

  offersElementsArray.forEach((offersElement) => {
    const {type, offers} = offersElement;

    if (type === eventType) {
      offersArray = offers;
    }
  });

  return offersArray;
};

export const getDestinationFromId = (idNumber, destinationsElementsArray) => {
  let destinationName = '';

  destinationsElementsArray.forEach((destinationsElement) => {
    const {id, name} = destinationsElement;

    if (id === idNumber) {
      destinationName = name;
    }
  });

  return destinationName;
};


export function formatDate(date, format) {
  return dayjs(date).format(format);
}

export function formatDuration(dateFrom, dateTo) {
  const startTime = dayjs(dateFrom);
  const endTime = dayjs(dateTo);
  const durationAllMinutes = endTime.diff(startTime, 'minute');

  const durationDays = Math.floor(durationAllMinutes / 1440);
  const durationHours = Math.floor((durationAllMinutes % 1440) / 60);
  const durationsMinutes = Math.floor((durationAllMinutes % 1440) % 60);
  const durationElements = [durationDays, durationHours, durationsMinutes];
  const durationResult = [];

  for (let i = 0; i < durationElements.length; i++) {
    if (durationElements[i] > 0) {
      if (durationElements[i] < 10) {
        durationResult.push(`0${durationElements[i]}${TIME_SUFFIXES[i]}`);
        continue;
      }

      durationResult.push(`${durationElements[i]}D`);
    }

  }

  return durationResult.join(' ');
}
