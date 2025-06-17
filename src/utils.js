import {TIME_SUFFIXES} from './const';
import dayjs from 'dayjs';


function formatDate(date, format) {
  return dayjs(date).format(format);
}

function formatDuration(dateFrom, dateTo) {
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


function isPointPresent(point) {
  const now = dayjs();
  const start = dayjs(point.dateFrom);
  const end = dayjs(point.dateTo);
  return (now.isAfter(start) || now.isSame(start)) &&
         (now.isBefore(end) || now.isSame(end));
}

function isPointFuture(point) {
  return dayjs().isBefore(dayjs(point.dateFrom));
}

function isPointPast(point) {
  return dayjs().isAfter(dayjs(point.dateTo));
}


function sortByDay(pointA, pointB) {
  return new Date(pointA.dateFrom) - new Date(pointB.dateFrom);
}

function sortByPrice(pointA, pointB) {
  return pointB.basePrice - pointA.basePrice;
}

function sortByDuration(pointA, pointB) {
  return dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom)) -
    dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
}

const isEscapeKey = (evt) => evt.key === 'Escape';


export {formatDate, formatDuration, isPointPresent, isPointFuture, isPointPast, sortByDay, sortByPrice, sortByDuration, isEscapeKey};
