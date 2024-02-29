export class Node extends Element {
  
  number;
  image;
  
  constructor(name, number, image) {
    super(name);
    this.number = number;
    this.image = image;
  }
  
}