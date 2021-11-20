//# Display
class Display {
  constructor() {
    //@ not from arguments
    this.typeOperation = undefined; //@ type of operation tu resolve
    this.display_backupValue = ''; //@ backup value accumulator to print on display
    this.display_actualValue = ''; //@ actual value accumulator to print on display
    this.calculator = new Calculator(); //@ method to run operation
    this.reverseActive = false;
    this.signType = '';
  }

  //>!: about the param reverseActive
  /*
   * executing calc () changes the state of this.reverseActive to "true"
   * this.typeOperation will be assigned the value 'addition'
   * This is necessary because display_actualValue also prints the total
   */

  //{}: methods to delete one or all values
  delete() {
    this.display_actualValue = this.display_actualValue.toString().slice(0, -1);
    this.printValue();
  }

  deleteAll() {
    this.display_actualValue = '';
    this.display_backupValue = '';
    this.signType = '';
    this.signOperation = '';
    this.typeOperation = undefined;
    this.printValue();
  }

  //{}: method compute
  /*
   * The "compute" method establishes the type of operation to be performed
   * sets the position of display_backupValue on the display
   * clears the values of display_actualValue when it indicates the type of operation
   */
  compute(typeOper) {
    if (this.display_actualValue === '-' || this.display_actualValue === '')
      return;
    if (this.typeOperation !== 'equal') {
      this.calc();
    }
    //@ assigns type operation
    this.typeOperation = typeOper;

    //@ print values to new positions on screen
    this.display_backupValue =
      this.display_actualValue || this.display_backupValue;

    //@ now the actualValue is on backupValue area
    this.display_actualValue = '';
    this.printValue();
  }

  // {}: review if is a negative value to change class color
  isNegativeValue() {
    if (actualValue.textContent.includes('-')) {
      actualValue.classList.add('negativeValue');
    } else {
      actualValue.classList.remove('negativeValue');
    }

    if (backupValue.textContent.includes('-')) {
      backupValue.classList.add('negativeValue');
    } else {
      backupValue.classList.remove('negativeValue');
    }
  }

  //{}: are too many numbers to display?
  /*
   * only nine numbers will be displayed.
   * Otherwise, the addNumber() loop exits
   */
  tooManyNumbers() {
    if (
      (this.display_actualValue.includes('-') &&
        this.display_actualValue.length > 9) ||
      (!this.display_actualValue.includes('-') &&
        this.display_actualValue.length > 8)
    ) {
      if (this.display_backupValue === '') {
        this.display_backupValue = 'too many numbers';
        this.printValue();
        return false;
      } else {
        return false;
      }
    }
  }

  //{}: add sign to number
  /*
   * it is evaluated if display_actualValue already contain a sign '-'
   * according to that it, '-' is removed or included
   */
  negativeValues() {
    if (this.signType.includes('-') || this.display_actualValue.includes('-')) {
      if (this.display_actualValue.length > 1) return;
      this.signType = '';
      this.display_actualValue = this.signType;
      this.printValue();
    } else {
      if (this.display_actualValue.toString() !== '') return;
      this.signType = '-';
      this.display_actualValue = this.signType;
      this.printValue();
    }
  }

  //{}: add numbers to display
  /*
   * This method will adds the numbers entered by the user.
   * send to printValue() method.
   * Condition: It only admits the entry of one point per value group
   */
  addNumber(number) {
    //> after equal, reasign typeOperation to reverse displays
    if (this.reverseActive === true) {
      this.typeOperation = 'addition'; //@ typeOperation after calc()
      actualValue.classList.remove('negativeValue');
      this.display_backupValue = '';
      this.signOperation = '';
    }

    if (number === '.' && this.display_actualValue.includes('.')) return;

    this.tooManyNumbers();

    if (this.tooManyNumbers() === false) {
      return;
    } else {
      this.display_actualValue = `${this.display_actualValue.toString()}${number.toString()}`;
      this.printValue();
    }
  }

  //{}: add sign of type operation at display
  // toDO: respuesta de signOperation al ingresar solo signo negatico sin una cifra
  /*
   * this method shows the sign of the type of operation
   * the sign should not be seen if there are no numbers on displa_backupValue
   */
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

    //> print conditions to use actualValue or backupValue
    if (this.typeOperation !== 'equal') {
      //> printing values to calculate
      actualValue.textContent = this.display_actualValue;
      backupValue.textContent = this.display_backupValue;
      this.signType = ''; //@ limits multiple printing of signType from addNumber()
      signOperation.textContent = this.signOperation; //@ show signOperation
      this.isNegativeValue();
      this.reverseActive = false; //@ should be false to execute operations
    } else if (this.typeOperation === 'equal') {
      //> printing result
      actualValue.textContent = this.display_backupValue;
      backupValue.textContent = this.display_actualValue;
      signOperation.textContent = ''; //@ the typeOperation sign is not show
      this.isNegativeValue();
    }
  }

  //{}: calc operation
  calc() {
    const actualValue_calc = parseFloat(this.display_actualValue);
    const backupValue_calc = parseFloat(this.display_backupValue);

    if (isNaN(actualValue_calc) || isNaN(backupValue_calc)) return;
    this.display_actualValue = this.calculator[this.typeOperation](
      backupValue_calc,
      actualValue_calc
    );

    this.reverseActive = true; //@ active reverse to show "diplay values"
    this.signType = ''; // todo: comprobar utilidad
  }
}
