//# Display
class Display {
  constructor(
    backupValue_sign,
    backupValue,
    signOperation,
    actualValue_sign,
    actualValue
  ) {
    //@ from arguments
    this.backupValue_sign = backupValue_sign; //? backup value operator is + or - ?
    this.backupValue = backupValue; //? backup value number
    this.signOperation = signOperation; //? display type operation
    this.typeOperation = undefined; //? type of operation tu resolve
    this.actualValue_sign = actualValue_sign; //? actual value operator is + or - ?
    this.actualValue = actualValue; //? actual value number

    //@ not from arguments
    this.calculator = new Calculator(); //? method to run operation
    this.display_backupValue = ''; //? backup value accumulator to print on display
    this.display_actualValue = ''; //? actual value accumulator to print on display
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
      this.display_actualValue || this.display_backupValue;
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
    if (signOper === '=') return;
    this.signOperation = signOper.toString();
    this.printValue();
  }

  //{}: print values on display
  printValue() {
    actualValue.textContent = this.display_actualValue;
    backupValue.textContent = this.display_backupValue;
    signOperation.textContent = this.signOperation;
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
