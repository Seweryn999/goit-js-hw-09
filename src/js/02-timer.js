import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
      alert('Please choose a date in the future');
      return;
    }

    const startButton = document.querySelector('[data-start]');
    startButton.removeAttribute('disabled');
    clearInterval(countdownInterval); // Zatrzymanie aktualnego odliczenia
  },
};

flatpickr('#datetime-picker', options);

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const startButton = document.querySelector('[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

let countdownInterval;

startButton.addEventListener('click', () => {
  const selectedDate = new Date(
    flatpickr.parseDate(document.getElementById('datetime-picker').value)
  );
  const currentDate = new Date();

  if (selectedDate <= currentDate) {
    alert('Please choose a date in the future');
    return;
  }

  startButton.setAttribute('disabled', true);

  clearInterval(countdownInterval); // Zatrzymanie aktualnego odliczenia przed rozpoczęciem nowego

  countdownInterval = setInterval(() => {
    const msRemaining = selectedDate - new Date();

    if (msRemaining <= 0) {
      clearInterval(countdownInterval);
      daysElement.textContent = '00';
      hoursElement.textContent = '00';
      minutesElement.textContent = '00';
      secondsElement.textContent = '00';
      startButton.removeAttribute('disabled');
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(msRemaining);

    daysElement.textContent = addLeadingZero(days);
    hoursElement.textContent = addLeadingZero(hours);
    minutesElement.textContent = addLeadingZero(minutes);
    secondsElement.textContent = addLeadingZero(seconds);
  }, 1000);
});
