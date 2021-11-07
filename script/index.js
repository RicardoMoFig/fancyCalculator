//# JavaScript principal
const backupValue_operator = document.getElementById('backupValue-operator');
const backupValue = document.getElementById('backupValue');
const typeOperation = document.getElementById('typeOperation');
const actualValue_operator = document.getElementById('actualValue-operator');
const actualValue = document.getElementById('actualValue');
const numBtn = document.querySelectorAll('.numBtn');
const operBtn = document.querySelectorAll('.operBtn');

const display = new Display(backupValue, actualValue);

//> registrando clicks de ingreso de values
numBtn.forEach((button) => {
  button.addEventListener('click', () => display.addNumber(button.innerHTML));
});
