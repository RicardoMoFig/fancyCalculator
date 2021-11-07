//# Display
class Display {
  constructor(
    backupValue_operator,
    backupValue,
    typeOperator,
    actualValue_operator,
    actualValue
  ) {
    //@ from arguments
    this.backupvalue_operator = backupValue_operator; //? backup value operator is + or - ?
    this.backupValue = backupValue; //? backup value number
    this.typeOperator = typeOperator; //? type of operation tu resolve
    this.actualValue_operator = actualValue_operator; //? actual value operator is + or - ?
    this.actualValue = actualValue; //? actual value number

    //@ not from arguments
    this.calculator = new Calculator(); //? method to run operation
    this.display_backupValue = ''; //? backup value accumulator to print on display
    this.display_actualValue = ''; //? actual value accumulator to print on display
  }

  //> add new numbers to the display when a numbers button is pressed on the calculator
  addNumber(number) {
    //? not more than one dot
    if (number === '.' && this.display_actualValue.includes('.')) return;

    //? add a new number or dot
    this.display_actualValue = `${this.display_actualValue.toString()}${number.toString()}`;
    this.printValue();
  }

  //> print values on display
  printValue() {
    actualValue.textContent = this.display_actualValue;
    backupValue.textContent = this.display_backupValue;
  }
}
