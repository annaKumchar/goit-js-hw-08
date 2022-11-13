import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');

formEl.addEventListener('input', throttle(onFormFillingSet, 500));
formEl.addEventListener('submit', onFormSubmit);

const FORM_KEY = 'feedback-form-state';

function onFormFillingSet(event) {
  let savedDate = JSON.parse(localStorage.getItem(FORM_KEY)) ?? {};

  const { name, value } = event.target;

  savedDate = { ...savedDate, [name]: value };

  localStorage.setItem(FORM_KEY, JSON.stringify(savedDate));
}

function onFormSubmit(event) {
  event.preventDefault();

  let finalData = {};
  const formData = new FormData(formEl);
  for (const [name, value] of formData.entries()) {
    finalData[name] = value;
  }
  event.currentTarget.reset();
  console.log(finalData);
}

function onFormFillingGet() {
  const getValueLocalStorage = JSON.parse(localStorage.getItem(FORM_KEY)) ?? {};
  const inputNames = Object.keys(getValueLocalStorage);
  inputNames.forEach(inputName => {
    let input = formEl.elements[inputName];
    let valueKey = 'value';
    input[valueKey] = getValueLocalStorage[inputName];
  });
  // const parsedGetValueLocalStorage = JSON.parse(getValueLocalStorage);
  // if (parsedGetValueLocalStorage) {
  //   formEmailEl.value = parsedGetValueLocalStorage.email;
  //   formMessegeEl.value = parsedGetValueLocalStorage.message;
  // }
};
onFormFillingGet();
