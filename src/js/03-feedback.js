import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const formEmailEl = document.querySelector('input');
const formMessegeEl = document.querySelector('textarea');

formEl.addEventListener('input', throttle(onFormFillingSet, 500));
formEl.addEventListener('submit', onFormSubmit);

const formInputEl = {
  email: '',
  message: '',
};
function onFormFillingSet(event) {
  const { name, value } = event.target;
  formInputEl[name] = value;
  localStorage.setItem('feedback-form-state', JSON.stringify(formInputEl));
}

function onFormSubmit(event) {
  event.preventDefault();
  event.currentTarget.reset();
  console.log(formInputEl);
}

function onFormFillingGet() {
  const getValueLocalStorage = localStorage.getItem('feedback-form-state');
  const parsedGetValueLocalStorage = JSON.parse(getValueLocalStorage);
  if (parsedGetValueLocalStorage) {
    formEmailEl.value = parsedGetValueLocalStorage.email;
    formMessegeEl.value = parsedGetValueLocalStorage.message;
  }
}
onFormFillingGet();
