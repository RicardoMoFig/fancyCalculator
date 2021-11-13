//# Display
class Display {
  constructor(
    backupValue_sign,
    backupValue,
    actualValue,
    signOperation,
    actualValue_sign
  ) {
    //@ from arguments
    this.backupValue_sign = backupValue_sign; //? backup value operator is + or - ?
    this.backupValue = backupValue; //? backup value number
    this.actualValue = actualValue; //? actual value number
    this.signOperation = signOperation; //? display type operation
    this.actualValue_sign = actualValue_sign; //? actual value operator is + or - ?

    //@ not from arguments
    this.typeOperation = undefined; //? type of operation tu resolve
    this.display_backupValue = ''; //? backup value accumulator to print on display
    this.display_actualValue = ''; //? actual value accumulator to print on display
    this.calculator = new Calculator(); //? method to run operation
  }

  //{}: methods to delete values
  delete() {
    this.display_actualValue = this.display_actualValue.toString().slice(0, -1);
    this.printValue();
  }

  deleteAll() {
    this.display_actualValue = '';
    this.display_backupValue = '';
    this.signOperation = '';
    this.typeOperation = undefined;
    this.printValue();
  }

  //{}: method compute
  compute(typeOper) {
    this.typeOperation !== 'equal' && this.calc();
    this.typeOperation = typeOper;
    this.display_backupValue =
      this.display_actualValue || this.display_backupValue; //? display the first true
    this.display_actualValue = '';
    this.printValue();
  }

  //{}: add numbers to display
  addNumber(number) {
    //? not more than one dot
    if (number === '.' && this.display_actualValue.includes('.')) return;

    //? add a new number or dot
    this.display_actualValue = `${this.display_actualValue.toString()}${number.toString()}`;
    this.printValue();
  }

  //{}: add sign of type operation at display
  display_signOperation(signOper) {
    console.log(`Tipo: ${signOper}`); // todo: delete
    if (signOper === '=' || this.display_backupValue === '') return;
    this.signOperation = signOper.toString();
    this.printValue();
  }

  //{}: print values on display
  printValue() {
    actualValue.textContent = this.display_actualValue;
    backupValue.textContent = this.display_backupValue;

    //? no sign after compute the operation
    if (this.typeOperation !== 'equal') {
      /* display sign before compute operation */
      signOperation.textContent = this.signOperation;
    } else {
      /* no display signs after operation */
      signOperation.textContent = '';
    }
  }

  //{}: calc operation
  calc() {
    const actualValue = parseFloat(this.display_actualValue);
    const backupValue = parseFloat(this.display_backupValue);

    if (isNaN(actualValue) || isNaN(backupValue)) return;
    this.display_actualValue = this.calculator[this.typeOperation](
      actualValue,
      backupValue
    );
  }
}
