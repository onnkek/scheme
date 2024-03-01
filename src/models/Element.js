export class Element {
  
  name;
  id = Math.random();
  
  constructor(name) {
    this.name = name;
  }
  drawComponent() { }
  hitTest(cursor, radius) { }
}