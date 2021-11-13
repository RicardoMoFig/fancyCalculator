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
    if (this.typeOperation !== 'equal' && this.display_actualValue !== '') {
      this.calc();
    }

    //@ asignan type operation
    this.typeOperation = typeOper;

    //@ display values to new positions on display
    this.display_backupValue =
      this.display_actualValue || this.display_backupValue; //? display the first true

    //@ now we don't show actualValue
    this.display_actualValue = '';

    //@ call function printValue
    this.printValue();
  }

  //{}: add numbers to display
  addNumber(number) {
    if (number === '.' && this.display_actualValue.includes('.')) return;
    this.display_actualValue = `${this.display_actualValue.toString()}${number.toString()}`;
    this.printValue();
  }

  //{}: add sign of type operation at display
  /* Este método evalúa el tipo de signo de operador recibido desde index.js a través del evento click registrado desde display_signOperation. Esto permite determinar si el operador equal ha sido llamado y entonces debe ser ocultado del display */
  display_signOperation(signOper) {
    if (signOper === '=' || this.display_backupValue === '') return;
    this.signOperation = signOper.toString();
    this.printValue();
  }

  //{}: print values on display
  printValue() {
    if (this.typeOperation !== 'equal') {
      //> printing values to calculate
      actualValue.textContent = this.display_actualValue;
      backupValue.textContent = this.display_backupValue;
      //@ show signOperation
      signOperation.textContent = this.signOperation;
    } else if (this.typeOperation === 'equal') {
      //> printing result
      //@ orden deseado
      actualValue.textContent = this.display_backupValue;
      backupValue.textContent = this.display_actualValue;
      //@ if the compute() was done, the typeOperation sign is not show
      signOperation.textContent = '';
    }
  }

  //{}: calc operation
  calc() {
    const actualValue = parseFloat(this.display_actualValue);
    const backupValue = parseFloat(this.display_backupValue);

    if (isNaN(actualValue) || isNaN(backupValue)) return;
    this.display_actualValue = this.calculator[this.typeOperation](
      backupValue,
      actualValue
    );
  }
}
