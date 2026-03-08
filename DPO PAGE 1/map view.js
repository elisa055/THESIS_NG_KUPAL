const mapArea = document.getElementById('mapArea');
const popup   = document.getElementById('popup');

const pins = [
  { x: 62, y: 52, color: 'orange', name: "Aling Bebang's Store", addr: 'Purok 3, Zone 13' },
  { x: 42, y: 64, color: 'yellow', name: "Santos Sari-Sari",     addr: 'Purok 1, Zone 11' },
  { x: 78, y: 35, color: 'green',  name: "Dela Cruz Bakery",     addr: 'Purok 5, Zone 14' }
];

pins.forEach(p => {
  const el = document.createElement('div');
  el.className = 'pin ' + p.color;
  el.style.left = p.x + '%';
  el.style.top  = p.y + '%';

  el.addEventListener('click', e => {
    e.stopPropagation();

    // Update popup dot color
    const dot = popup.querySelector('.popup-dot');
    dot.className = 'dot popup-dot ' + p.color;

    // Update popup content
    popup.querySelector('.popup-name').textContent = p.name;
    popup.querySelector('.popup-addr').textContent = p.addr;

    // Position popup near the pin
    const rect = mapArea.getBoundingClientRect();
    const pinLeft = rect.left + (p.x / 100) * rect.width;
    const pinTop  = rect.top  + (p.y / 100) * rect.height + window.scrollY;

    popup.style.left    = (pinLeft + 16) + 'px';
    popup.style.top     = (pinTop  - 20) + 'px';
    popup.style.display = 'block';
  });

  mapArea.appendChild(el);
});

document.addEventListener('click', e => {
  if (!e.target.classList.contains('pin') && !popup.contains(e.target)) {
    popup.style.display = 'none';
  }
});