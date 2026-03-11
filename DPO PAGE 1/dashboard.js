const editBtn     = document.getElementById('editBtn');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose  = document.getElementById('modalClose');

// Open modal
editBtn.addEventListener('click', () => {
  modalOverlay.classList.add('open');
});

// Close via Back button
modalClose.addEventListener('click', () => {
  modalOverlay.classList.remove('open');
});

// Close by clicking outside the modal box
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) {
    modalOverlay.classList.remove('open');
  }
});

// Close with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    modalOverlay.classList.remove('open');
  }
});
