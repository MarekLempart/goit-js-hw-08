import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');

// Funkcja, która sprawdza, czy oba pola są uzupełnione
const isFormValid = () => {
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();
  return email !== '' && message !== '';
};

// Nasłuchiwanie zdarzeń dla input w polach email i message
form.addEventListener(
  'input',
  throttle(() => {
    // Zapisuje stan formularza do localStorage
    const formState = {
      email: emailInput.value.trim(),
      message: messageInput.value.trim(),
    };
    localStorage.setItem('feedback-form-state', JSON.stringify(formState));
  }, 500)
);

// Sprawdza i wypełnia pola formularza przy ponownym załadowaniu strony
const storedFormState = localStorage.getItem('feedback-form-state');
if (storedFormState) {
  const parsedFormState = JSON.parse(storedFormState);
  emailInput.value = parsedFormState.email;
  messageInput.value = parsedFormState.message;
}

// Nasłuchiwanie zdarzeń dla wysyłki formularza
form.addEventListener('submit', event => {
  event.preventDefault();

  // Sprawdzenie czy każde pole jest uzupełnione
  if (isFormValid()) {
    console.log('Form submitted with data:', {
      email: emailInput.value.trim(),
      message: messageInput.value.trim(),
    });

    // Wyczyszczenie localStorage i zresetowanie formularza
    localStorage.removeItem('feedback-form-state');
    form.reset();
  } else {
    // W przypadku, gdy któreś z pół jest puste, wyświetla alert
    alert('Fill in both fields before submitting the form!');
  }
});

// // ---- kod 01 ---- stara wersja bez spawdzenia czy obydwa pola są uzupełnione.
// import throttle from 'lodash.throttle';

// const form = document.querySelector('.feedback-form');
// const emailInput = form.querySelector('input[name="email"]');
// const messageInput = form.querySelector('textarea[name="message"]');

// // Nasłuchiwanie zdarzeń dla input w polach email i message
// form.addEventListener(
//   'input',
//   throttle(() => {
//     // Zapisuje stan formularza do localStorage
//     const formState = {
//       email: emailInput.value.trim(),
//       message: messageInput.value.trim(),
//     };
//     localStorage.setItem('feedback-form-state', JSON.stringify(formState));
//   }, 500)
// );

// // Sprawdza i wypełnia pola formularza przy ponownym załadowaniu strony
// const storedFormState = localStorage.getItem('feedback-form-state');
// if (storedFormState) {
//   const parsedFormState = JSON.parse(storedFormState);
//   emailInput.value = parsedFormState.email;
//   messageInput.value = parsedFormState.message;
// }

// // Nasłuchiwanie zdarzeń dla wysyłki formularza
// form.addEventListener('submit', event => {
//   event.preventDefault();
//   // Wyczyść localStorage i zaloguj dane formularza po wysłaniu
//   console.log('Formularz wysłany z danymi:', {
//     email: emailInput.value.trim(),
//     message: messageInput.value.trim(),
//   });
//   localStorage.removeItem('feedback-form-state');
//   form.reset();
// });
