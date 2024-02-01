import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');

// Słuchacz zdarzeń dla input w polach email i message
form.addEventListener(
  'input',
  throttle(() => {
    // Zapisz stan formularza do localStorage
    const formState = {
      email: emailInput.value,
      message: messageInput.value,
    };
    localStorage.setItem('feedback-form-state', JSON.stringify(formState));
  }, 500)
);

// Sprawdź i wypełnij pola formularza przy ponownym załadowaniu strony
const storedFormState = localStorage.getItem('feedback-form-state');
if (storedFormState) {
  const parsedFormState = JSON.parse(storedFormState);
  emailInput.value = parsedFormState.email;
  messageInput.value = parsedFormState.message;
}

// Słuchacz zdarzeń dla wysyłki formularza
form.addEventListener('submit', event => {
  // Wyczyść localStorage i zaloguj dane formularza po wysłaniu
  localStorage.removeItem('feedback-form-state');
  console.log('Formularz wysłany z danymi:', {
    email: emailInput.value,
    message: messageInput.value,
  });
});
