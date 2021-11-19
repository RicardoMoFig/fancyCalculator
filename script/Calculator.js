//# Calculator Class
class Calculator {
  //{}: fix decimals to display
  fixTotal(total) {
    if (Number.isInteger(total) && total.toString().length > 7) {
      total = Math.cbrt(total);
      total = `${total.toFixed(2)}e4`;
      return total;
    } else if (Number.isInteger(total)) {
      return total;
    } else if (total.toString().length > 7) {
      total = Math.cbrt(total);
      total = `${total.toFixed(2)}e4`;
      return total;
    } else {
      return total.toFixed(3);
    }
  }

  //{}: methods to perform mathematical operations
  addition(value1, value2) {
    const total = value1 + value2;
    return this.fixTotal(total);
    // return value1 + value2;
  }

  substract(value1, value2) {
    const total = value1 - value2; // toDO: revisar restas de resultado cero
    return this.fixTotal(total);
  }

  product(value1, value2) {
    const total = value1 * value2;
    return this.fixTotal(total);
  }

  module(value1, value2) {
    const total = value1 / value2;
    return this.fixTotal(total);
  }
}
