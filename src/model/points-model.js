import { pointsElementsMock } from '../mock/points-mock';


export default class PointsModel {
  constructor() {
    this.points = [...pointsElementsMock];
  }

  getPoints() {
    return this.points;
  }
}
