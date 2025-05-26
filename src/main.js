import Presenter from './presenter/main-presenter.js';

const newPointButton = document.querySelector('.trip-main__event-add-btn');
const boardPresenter = new Presenter();

const handleNewPointClick = (evt) => {
  evt.preventDefault();
  boardPresenter.createPoint();
  newPointButton.disabled = true;
};

newPointButton.addEventListener('click', handleNewPointClick);


boardPresenter.init();
