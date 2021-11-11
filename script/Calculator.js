//# Calculator Class
class Calculator {
  // todo:1 luego serà necesario el uso de un constructor
  // constructor(
  //   backupValue_sign,
  //   backupValue,
  //   typeOperation,
  //   actualValue_sign,
  //   actualValue
  // ) {
  //   this.backupValue_sign = backupValue_sign;
  //   this.backupValue = backupValue;
  //   this.typeOperation = typeOperation;
  //   this.actualValue_sign = actualValue_sign;
  //   this.actualValue = actualValue;
  // }

  //{}: methods to perform mathematical operations
  addition(value1, value2) {
    return value1 + value2;
  }

  substract(value1, value2) {
    return value1 - value2;
  }

  product(value1, value2) {
    return value1 * value2;
  }

  module(value1, value2) {
    return value1 / value2;
  }
}
