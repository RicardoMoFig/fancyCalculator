//# Calculator Class
class Calculator {
  //{}: fix decimals to display
  fixTotal(total) {
    console.log(`
      in typeof total: ${typeof total}
      in total: ${total}
    `);
    const longLimit = total.toString().length > 7;
    const decimals = 2;

    if (Number.isInteger(total) && longLimit) {
      total = Math.cbrt(total);
      total = `${total.toFixed(decimals)}e4`;
      return total;
    } else if (Number.isInteger(total)) {
      return total;
    } else if (longLimit) {
      total = Math.cbrt(total);
      total = `${total.toFixed(decimals)}e4`;
      return total;
    } else {
      return total.toFixed(decimals);
    }
  }

  //{}: methods to perform mathematical operations
  addition(value1, value2) {
    const total = value1 + value2;
    return this.fixTotal(total);
  }

  substract(value1, value2) {
    console.log(`
      typeof 1: ${typeof value1}
      value 1: ${value1}
      typeof 2: ${typeof value2}
      value 2: ${value2}
    `);
    const total = value1 - value2; // toDO: revisar restas de resultado cero
    console.log(`
      typeof total: ${typeof total}
      total: ${total}
    `);
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
