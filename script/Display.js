//# Display
class Display {
  constructor() {
    //@ not from arguments
    this.typeOperation = undefined; //@ type of operation tu resolve
    this.display_backupValue = ''; //@ backup value accumulator to print on display
    this.display_actualValue = ''; //@ actual value accumulator to print on display
    this.calculator = new Calculator(); //@ method to run operation
    this.reverseActive = false;
    this.calculator_isActive = false;
    this.flickerLight = flickerLight;
    this.switchBtn = switchBtn;
    this.calculatorScreen = screenOn;
    this.signType = '';
  }

  // >!: about the param reverseActive
  /*
   * executing calc () changes the state of this.reverseActive to "true"
   * this.typeOperation will be assigned the value 'addition'
   * This is necessary because display_actualValue also prints the total
   */

  //{}: flicker light
  onflickerLight() {
    if (!this.calculator_isActive) return;
    flickerLight.classList.toggle('flicker');
    setTimeout(function () {
      flickerLight.classList.toggle('flicker');
    }, 1000);
  }

  //{}: switchBtn
  switchActive() {
    switchBtn.classList.toggle('switchOn');
    if (switchBtn.classList.contains('switchOn')) {
      screenOn.classList.add('calculator__display-on');
      this.calculator_isActive = true;
      this.onflickerLight();
      this.printValue();
    } else {
      screenOn.classList.remove('calculator__display-on');
      this.calculator_isActive = false;
      this.deleteAll();
    }
  }

  //{}: event.key
  /*
   * the user can use some keys to manage the calculator
   */
  keyMap(key) {
    if (!this.calculator_isActive) return;
    const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];
    const operators = ['+', '-', '*', '/', '%', '=', 'Enter'];
    const controls = ['Backspace', 'Delete'];

    let num_keyValue = numbers.find((num) => num === key);
    let oper_keyValue = operators.find((num) => num === key);
    let control_key = controls.find((order) => order === key);

    if (num_keyValue) {
      this.addNumber(num_keyValue);
    } else if (oper_keyValue) {
      switch (oper_keyValue) {
        case '+':
          oper_keyValue = 'addition';
          this.display_signOperation('+');
          break;
        case '-':
          if (
            this.display_actualValue === '' ||
            this.display_actualValue === '-'
          ) {
            this.negativeValues();
          } else {
            oper_keyValue = 'substract';
            this.display_signOperation('-');
          }
          break;
        case '*':
          oper_keyValue = 'product';
          this.display_signOperation('*');
          break;
        case '/':
        case '%':
          oper_keyValue = 'module';
          this.display_signOperation('%');
          break;
        case 'Enter':
        case '=':
          oper_keyValue = 'equal';
          this.display_signOperation('=');
          break;
      }
      return this.compute(oper_keyValue);
    } else if (control_key) {
      switch (control_key) {
        case 'Backspace':
          this.delete();
          break;
        case 'Delete':
          this.deleteAll();
          break;
      }
    } else {
      return;
    }
  }

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
      this.calc(); //@ permite calcular resultados al digitar cualquier operador
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

  //{}: add numbers to display
  /*
   * This method will adds the numbers entered by the user.
   * send to printValue() method.
   * Condition: It only admits the entry of one point per value group
   */
  addNumber(number) {
    if (!this.calculator_isActive) return;
    //> after equal, reasign typeOperation to reverse displays
    if (this.reverseActive === true) {
      this.typeOperation = 'addition'; //@ typeOperation after calc()
      actualValue.classList.remove('negativeValue');
      this.display_backupValue = '';
      this.signOperation = '';
    }

    if (number === '.' && this.display_actualValue.includes('.')) return;

    if (this.tooManyNumbers() === true) {
      return;
    } else {
      this.display_actualValue = `${this.display_actualValue.toString()}${number.toString()}`;
      this.printValue();
    }
  }

  //{}: too many numbers to display?
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
    )
      return true;
  }

  // {}: check if it is a negative value to change class color
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

  //{}: add sign to number
  /*
   * it is evaluated if display_actualValue already contain a sign '-'
   * according to that it, '-' is removed or included
   */
  negativeValues() {
    if (!this.calculator_isActive) return;
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

  //{}: add sign of type operation at display
  // toDO: respuesta de signOperation al ingresar solo signo negatico sin una cifra
  /*
   * this method shows the sign of the type of operation
   * the sign should not be seen if there are no numbers on displa_backupValue
   */
  display_signOperation(signOper) {
    if (
      !this.calculator_isActive ||
      signOper === '=' ||
      this.display_backupValue === ''
    )
      return;
    this.signOperation = signOper;
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

    // todo: permitir mostrar resultado final del hijo de calculos continuos

    this.display_actualValue = this.calculator[this.typeOperation](
      backupValue_calc,
      actualValue_calc
    );

    this.reverseActive = true; //@ active reverse to show "diplay values"
    this.signType = ''; // todo: comprobar utilidad
  }
}
