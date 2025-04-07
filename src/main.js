import Presenter from './presenter/main-presenter.js';
import { pointsElementsMock } from './mock/points-mock.js';
import { formatDate, formatDuration } from './utils.js';

formatDuration('2025-03-29T22:55:56.845Z', '2025-03-31T23:56:56.845Z');

const presenter = new Presenter();

presenter.init();
