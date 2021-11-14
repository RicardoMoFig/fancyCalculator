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
    this.reverseActive = false;
  }

  //>!: reverseActive
  //@ se encuentra como parte de los parámetros del constructor
  //> Impresión de valores de resultado y nuevos valores a operar
  /* Al detectarse el ingreso al método calc(), se cambia el estado de this.reverseActive de false a true. Esto permite que una condicional if dentro del método addNumber() asigne a this.typeOperation el valor 'addition' para que, al añadir un nuevo número, este nuevo valor sea impreso en display_actualValue se imprima a través del condicional if de printValue(), ya que es la ruta else if de printValue(), la que fue utilizada al imprimir el resultado de la operación. Todo esto es necesario porque display_actualValue se usa tanto para imprimir el total como los valores a operar */

  //{}: methods to delete one or ddelete all values
  /* The "delete" nmethod allows you to delete the added values in display_actualValue. This method will remove one value at a time. In turn, the "deleteAll" method will erase all values from the screen. Yhat is, it will remove the values for display_actualValue, display_backupValue, and signOperation. */
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
  /* The "compute" method establiches the type of operation to be carried out and established de position of the backup and actual (current) values on the screen, as well as deleted the values of display_actualValue when the type of operation to be carried aout is indicated */
  compute(typeOper) {
    if (this.typeOperation !== 'equal') {
      this.calc();
    }
    this.typeOperation = typeOper; //@ asignan type operation

    //@ display values to new positions on display (first true)
    this.display_backupValue =
      this.display_actualValue || this.display_backupValue;

    this.display_actualValue = ''; //@ now the actualValue is on backupValue area
    this.printValue(); //@ call function printValue
  }

  //{}: add numbers to display
  /* This method will adds the numbers entered by the user, to send then to the printValue() method. Condition: It only admits the entry of one point per value group */
  addNumber(number) {
    if (this.reverseActive === true) {
      this.typeOperation = 'addition'; //@ aqui se cambia de equal a addition
      this.display_backupValue = '';
      this.signOperation = '';
    }
    if (number === '.' && this.display_actualValue.includes('.')) return;

    this.display_actualValue = `${this.display_actualValue.toString()}${number.toString()}`;
    this.printValue();
  }

  //{}: add sign of type operation at display
  /* This method evaluates tyhe type of operator sign received from index.js, through the click event, registered from display_signOperation.This allows you to determine if the "equal" operator has been called, which indicates, then, that the operator sign should be hidden on the screen. */
  display_signOperation(signOper) {
    if (signOper === '=' || this.display_backupValue === '') return;
    this.signOperation = signOper.toString();
    this.printValue();
  }

  //{}: print values on display
  printValue() {
    if (this.reverseActive === true && this.typeOperation === 'equal') {
      this.reverseActive = true; //@ allows print actualValue in display_actualValue
    }
    if (this.typeOperation !== 'equal') {
      //> printing values to calculate
      actualValue.textContent = this.display_actualValue;
      backupValue.textContent = this.display_backupValue;
      //@ show signOperation
      signOperation.textContent = this.signOperation;
      this.reverseActive = false; //@ debe cambiar a false para que se ejecuten operaciones
    } else if (this.typeOperation === 'equal') {
      //> printing result
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

    this.reverseActive = true; //@ active reverse to show "diplay values"
  }
}
