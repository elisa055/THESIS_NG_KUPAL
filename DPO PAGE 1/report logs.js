document.querySelectorAll('.see-photo').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    alert('Open proof photo here');
  });
});