import dayjs from 'dayjs';
import { TIME_SUFFIXES } from './const';


export const getRandomArrayElement = (array) => {
  const randomELemnt = Math.floor(Math.random() * array.length);

  return array[randomELemnt];
};

export const getRandomValue = (minPrice, maxPrice) => {
  const randomPrice = Math.round(Math.random() * (maxPrice - minPrice) + minPrice);

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
  const remainingMinutes = durationAllMinutes % 1440;
  const durationHours = Math.floor(remainingMinutes / 60);
  const durationsMinutes = remainingMinutes % 60 + 1;

  const durationElements = [durationDays, durationHours, durationsMinutes];
  const durationResult = [];

  for (let i = 0; i < durationElements.length; i++) {
    const value = durationElements[i];
    if (value > 0) {
      const suffix = TIME_SUFFIXES[i];
      const paddedValue = value < 10 ? `0${value}` : value;
      durationResult.push(`${paddedValue}${suffix}`);
    }

  }

  return durationResult.join(' ') || '00M';
}


export function isPointPresent(point) {
  return dayjs().isAfter(dayjs(point.date_from)) && dayjs().isBefore(dayjs(point.date_to));
}

export function isPointFuture(point) {
  return dayjs().isBefore(dayjs(point.date_to));
}

export function isPointPast(point) {
  return dayjs().isAfter(dayjs(point.date_from));
}


export function updatePointData(points, updatedPointData) {
  return points.map((point) => point.id === updatedPointData.id ? updatedPointData : point);
}


export function sortByDay(pointA, pointB) {
  return new Date(pointA.dateFrom) - new Date(pointB.dateFrom);
}

export function sortByPrice(pointA, pointB) {
  return pointB.basePrice - pointA.basePrice;
}

export function sortByDuration(pointA, pointB) {
  return dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom)) -
    dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
}
