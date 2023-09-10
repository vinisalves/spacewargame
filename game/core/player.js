export default class Player {
  constructor(name = null) {
    this.name = name;
    this.life = 100;
    this.aircraft = null;
    this.score = 0;
  }

  addAircraft(aircraft) {
    this.aircraft = aircraft;
  }
}
