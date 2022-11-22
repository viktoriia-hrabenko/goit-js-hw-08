import { throttle } from 'lodash';

const form = document.querySelector('.feedback-form');
const email = document.querySelector('input[name="email"]');
const message = document.querySelector('textarea[name="message"]');
const LOCALSTORAGE_KEY = 'feedback-form-state';
const fields = form.querySelectorAll('.field');

form.addEventListener(
  'input',
  throttle(e => {
    const objectToSave = { email: email.value, message: message.value };
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(objectToSave));
  }, 500)
); 
 
form.addEventListener('submit', e => {
  e.preventDefault();
  console.log({ email: email.value, message: message.value });
  form.reset();
  localStorage.removeItem(LOCALSTORAGE_KEY);
  

  for (let i = 0; i < fields.length; i++) {
  if (!fields[i].value) {
    console.log('field is blank', fields[i])
    let error = document.createElement('div')
    error.className='error'
    error.style.color = 'red'
    error.innerHTML = 'Cannot be blank'
    form[i].parentElement.insertBefore(error, fields[i])
  }
    
  const errors = form.querySelectorAll('.error')

  for (let i = 0; i < errors.length; i++) {
    errors[i].remove()
  }
}
}); 
 
const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

const storageData = load(LOCALSTORAGE_KEY);
if (storageData) {
  email.value = storageData.email;
  message.value = storageData.message;
} 

