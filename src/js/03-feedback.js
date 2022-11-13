import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const formEmailEl = document.querySelector('input');
const formMessegeEl = document.querySelector('textarea');

formEl.addEventListener('input', throttle(onFormFillingSet, 500));
formEl.addEventListener('submit', onFormSubmit);

const FORM_KEY = 'feedback-form-state';
const formInputEl = {
  email: '',
  message: '',
};
function onFormFillingSet(event) {
  const { name, value } = event.target;

  let savedDate = JSON.parse(localStorage.getItem(FORM_KEY)) ?? {};

  savedDate = { ...savedDate, [name]: value };

  localStorage.setItem('feedback-form-state', JSON.stringify(savedDate));
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
