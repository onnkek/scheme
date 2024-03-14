export class Serializer {
  constructor (types) {
    this.types = types;
  }

  markRecursive(object) {
    let idx = this.types.findIndex(t => {
      return t.name === object.constructor.name;
    });
    if (object instanceof Array) {
      for (let i = 0; i < object.length; i++) {
        this.markRecursive(object[i]);
      }
    }
    else if (idx !== -1) {
      object['typeIndex'] = idx;
      for (let key in object) {
        if (object.hasOwnProperty(key) && object[key] != null) {
          this.markRecursive(object[key]);
        }

      }
    }
  }

  cleanUp(object) {
    if (object.hasOwnProperty('typeIndex')) {
      delete object.typeIndex;
      for (let key in object) {
        if (object.hasOwnProperty(key) && object[key] != null) {
          this.cleanUp(object[key]);
        }
      }
    }
  }

  reconstructRecursive(object) {
    if (object instanceof Array) {
      let array = [];
      for (let i = 0; i < object.length; i++) {
        array.push(this.reconstructRecursive(object[i]));
      }
      return array;
    }
    if (object.hasOwnProperty('typeIndex')) {

      let type = this.types[object.typeIndex];
      let obj = new type();

      for (let key in object) {
        if (object.hasOwnProperty(key) && object[key] != null) {
          obj[key] = this.reconstructRecursive(object[key]);
        }
      }
      delete obj.typeIndex;
      return obj;
    }
    return object;
  }

  clone(object) {
    this.markRecursive(object);
    let copy = JSON.parse(JSON.stringify(object));
    this.cleanUp(object);
    return this.reconstructRecursive(copy);
  }
  serialize(object) {
    this.markRecursive(object);
    return JSON.stringify(object);
  }
  deserialize(string) {
    let object = JSON.parse(string);
    return this.reconstructRecursive(object);
  }
}