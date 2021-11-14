//# Calculator Class
class Calculator {
  //{}: fix decimals to display
  fixDecimals(total) {
    if (Number.isInteger(total)) {
      return total;
    } else {
      // todo: reduce number of decimal places (optional)
      return total.toFixed(5);
    }
  }

  //{}: methods to perform mathematical operations
  addition(value1, value2) {
    const total = value1 + value2;
    return this.fixDecimals(total);
    // return value1 + value2;
  }

  substract(value1, value2) {
    const total = value1 - value2;
    return this.fixDecimals(total);
  }

  product(value1, value2) {
    const total = value1 * value2;
    return this.fixDecimals(total);
  }

  module(value1, value2) {
    const total = value1 / value2;
    return this.fixDecimals(total);
  }
}
