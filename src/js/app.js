const eventConfig = window.eventConfig;

const countdownUnits = {
  days: document.querySelector('#days'),
  hours: document.querySelector('#hours'),
  minutes: document.querySelector('#minutes'),
  seconds: document.querySelector('#seconds')
};
const form = document.querySelector('#rsvp-form');
const status = document.querySelector('#form-status');
const submitButton = form.querySelector('button[type="submit"]');

document.querySelectorAll('[data-event="host"]').forEach((element) => { element.textContent = eventConfig.host; });
document.querySelectorAll('[data-event="date"]').forEach((element) => { element.textContent = eventConfig.dateLabel; });
document.querySelectorAll('[data-event="place"]').forEach((element) => { element.textContent = eventConfig.place; });

document.querySelector('#year').textContent = new Date().getFullYear();

function updateCountdown() {
  const difference = new Date(eventConfig.dateISO) - new Date();
  if (difference <= 0) {
    Object.values(countdownUnits).forEach((unit) => { unit.textContent = '00'; });
    return;
  }
  const totalSeconds = Math.floor(difference / 1000);
  countdownUnits.days.textContent = String(Math.floor(totalSeconds / 86400)).padStart(2, '0');
  countdownUnits.hours.textContent = String(Math.floor(totalSeconds % 86400 / 3600)).padStart(2, '0');
  countdownUnits.minutes.textContent = String(Math.floor(totalSeconds % 3600 / 60)).padStart(2, '0');
  countdownUnits.seconds.textContent = String(totalSeconds % 60).padStart(2, '0');
}

function showStatus(message, isError = false) {
  status.textContent = message;
  status.className = isError ? 'form-status error' : 'form-status success';
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const payload = Object.fromEntries(formData.entries());
  if (!payload.nombre || !payload.asistencia) {
    showStatus('Escribe tu nombre y elige una respuesta.', true);
    return;
  }
  if (!eventConfig.sheetsEndpoint) {
    showStatus('La invitacion esta lista. Falta conectar la URL de Google Sheets en src/data/event.js.', true);
    return;
  }
  submitButton.disabled = true;
  submitButton.textContent = 'Enviando...';
  try {
    await fetch(eventConfig.sheetsEndpoint, { method: 'POST', mode: 'no-cors', body: new URLSearchParams(payload) });
    form.reset();
    showStatus('Respuesta recibida. Diego ya sabe que vienes.');
  } catch (error) {
    showStatus('No se pudo enviar la respuesta. Intentalo de nuevo.', true);
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = 'Enviar respuesta';
  }
});

updateCountdown();
setInterval(updateCountdown, 1000);
