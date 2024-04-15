document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const delay = parseInt(this.querySelector('[name="delay"]').value, 10);
    const step = parseInt(this.querySelector('[name="step"]').value, 10);
    const amount = parseInt(this.querySelector('[name="amount"]').value, 10);

    for (let i = 0; i < amount; i++) {
      createPromise(i + 1, delay + i * step)
        .then(({ position, delay }) => {
          Notiflix.Notify.Success(
            `✅ Fulfilled promise ${position} in ${delay}ms`
          );
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.Success(
            `❌ Rejected promise ${position} in ${delay}ms`
          );
        });
    }
  });
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
