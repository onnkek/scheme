export class Element {

  id;
  name;
  terminals;

  constructor (name) {
    this.name = name;
    this.id = Math.random();
    this.terminals = [];
  }
  
  drawComponent() { }

  getFrame() { }

}