// calculation logic for button
document.getElementById('calcBtn').addEventListener('click', () => {
  const maghribVal = document.getElementById('maghribTime').value; // "for ex: 18:45"
  const fajrVal = document.getElementById('fajrTime').value;       // "for ex: 04:30"

  // invalid entry handling
  if (!maghribVal || !fajrVal) {
    alert('Please enter both times.');
    return;
  }

  // take time and date for now, parse into DAT object
  const today = new Date();
  const maghribDate = new Date(today.toDateString() + ' ' + maghribVal);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1); // move forward 1 calendar day
  const fajrDate = new Date(tomorrow.toDateString() + ' ' + fajrVal);


  // calculate ms
  const durationMs = fajrDate - maghribDate;

  // last third start time = maghrib + (2/3 of the night)
  const lastThirdStartDate = new Date(maghribDate.getTime() + durationMs * (2 / 3));

  // set text 
  document.getElementById('lastThirdStart').textContent = formatTime(lastThirdStartDate);
  document.getElementById('fajrEcho').textContent = formatTime(fajrDate);
  document.getElementById('result').classList.remove('hidden'); // unhide the result
});

// display as a readable time
function formatTime(date) {
  return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}

const baseDelay = 1800; // ms — lets the moon/hero settle first

// find every element with the class verse, read the data delay number and then set the animationDelay. 
document.querySelectorAll('.verse').forEach(el => {
  const stagger = Number(el.dataset.delay) || 0;
  el.style.animationDelay = `${baseDelay + stagger}ms`;
});