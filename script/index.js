//# JavaScript principal
const backupValue_sign = document.getElementById('backupValue-sign');
const backupValue = document.getElementById('backupValue');
const signOperation = document.getElementById('signOperation');
const actualValue_sign = document.getElementById('actualValue-sign');
const actualValue = document.getElementById('actualValue');
const numBtn = document.querySelectorAll('.numBtn');
const operBtn = document.querySelectorAll('.operBtn');
const signBtn = document.querySelectorAll('signBtn');
const deleteBtn = document.getElementById('deleteBtn');
const deleteAllBtn = document.getElementById('deleteAllBtn');
const display = new Display(backupValue, actualValue);

//> registering income of values
numBtn.forEach((button) => {
  button.addEventListener('click', () => display.addNumber(button.innerHTML));
});

//> type of operation to compute
operBtn.forEach((button) => {
  button.addEventListener('click', () => {
    display.compute(button.value);
    display.display_signOperation(button.innerHTML);
  });
});

//> delete action
deleteBtn.addEventListener('click', () => {
  display.delete();
});

//> deleteAll action
deleteAllBtn.addEventListener('click', () => {
  display.deleteAll();
});
