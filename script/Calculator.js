//# Calculator Class
class Calculator {
  // todo:1 luego serà necesario el uso de un constructor
  // constructor(
  //   backupValue_operator,
  //   backupValue,
  //   typeOperator,
  //   actualValue_operator,
  //   actualValue
  // ) {
  //   this.backupvalue_operator = backupValue_operator;
  //   this.backupValue = backupValue;
  //   this.typeOperator = typeOperator;
  //   this.actualValue_operator = actualValue_operator;
  //   this.actualValue = actualValue;
  // }

  //# methods of class
  addOper(value1, value2) {
    return value1 + value2;
  }

  subtractOper(value1, value2) {
    return value1 - value2;
  }

  productOper(value1, value2) {
    return value1 * value2;
  }

  moduleOper(value1, value2) {
    return value1 / value2;
  }
}
