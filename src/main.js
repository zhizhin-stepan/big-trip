import {END_POINT, AUTHORIZATION} from './const.js';
import Presenter from './presenter/main-presenter.js';
import PointsApiService from './model/points-api-service.js';
import PointsModel from './model/points-model.js';

const newPointButton = document.querySelector('.trip-main__event-add-btn');

const pointsModel = new PointsModel({pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)});
const boardPresenter = new Presenter({pointsModel});

const handleNewPointClick = (evt) => {
  evt.preventDefault();
  boardPresenter.createPoint();
  newPointButton.disabled = true;
};

newPointButton.addEventListener('click', handleNewPointClick);


boardPresenter.startInit();
pointsModel.init()
  .finally();
