//# JavaScript principal
const backupValue = document.getElementById('backupValue');
const actualValue = document.getElementById('actualValue');
const signOperation = document.getElementById('signOperation');
const numBtn = document.querySelectorAll('.numBtn');
const operBtn = document.querySelectorAll('.operBtn');
const signBtn = document.getElementById('signBtn');
const deleteBtn = document.getElementById('deleteBtn');
const deleteAllBtn = document.getElementById('deleteAllBtn');
const flickerLight = document.getElementById('flickerLight');
const switchBtn = document.getElementById('switchBtn');
const calculatorDisplay = document.getElementById('calcDisplay');
const display = new Display(backupValue, actualValue); // todo: review arguments

//> switch calculator
switchBtn.addEventListener('click', () => {
  display.switchActive();
});

//> signBtn
signBtn.addEventListener('click', () => {
  display.negativeValues();
  display.onflickerLight();
});

//> registering income of values
numBtn.forEach((button) => {
  button.addEventListener('click', () => {
    display.addNumber(button.innerHTML);
    display.onflickerLight();
  });
});

//> registering keypdown to send value
document.addEventListener('keydown', (event) => {
  display.keyMap(event.key);
  display.onflickerLight();
});

//> flickerLight

//> type of operation to compute
operBtn.forEach((button) => {
  button.addEventListener('click', () => {
    display.compute(button.value); //@ this define value to typeOper > this.typeOperation
    display.onflickerLight();
    display.display_signOperation(button.innerHTML);
  });
});

//> delete action
deleteBtn.addEventListener('click', () => {
  display.delete();
  display.onflickerLight();
});

//> deleteAll action
deleteAllBtn.addEventListener('click', () => {
  display.deleteAll();
  display.onflickerLight();
});
