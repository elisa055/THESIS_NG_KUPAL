// Combined auth page script: toggles panels and handles demo auth with localStorage.

const wrapper = document.getElementById('auth-wrapper');
const goSignup = document.getElementById('go-signup');
const goSignin = document.getElementById('go-signin');

if (goSignup) goSignup.addEventListener('click', () => wrapper.classList.add('right-panel-active'));
if (goSignin) goSignin.addEventListener('click', () => wrapper.classList.remove('right-panel-active'));

// Signup (single-page)
const signupForm = document.getElementById('signup-form');
if (signupForm) {
  signupForm.addEventListener('submit', e => {
    e.preventDefault();
    
    const name = (document.getElementById('su-name')||{}).value?.trim();
    const email = ((document.getElementById('su-email')||{}).value || '').trim().toLowerCase();
    const pass = (document.getElementById('su-password')||{}).value || '';
    const errorEl = document.getElementById('signup-error');
    if (!name || !email || !pass) { if(errorEl) errorEl.textContent = 'Please fill all fields'; return; }
    if (pass.length < 6) { if(errorEl) errorEl.textContent = 'Password must be at least 6 characters'; return; }
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.email === email)) { if(errorEl) errorEl.textContent = 'An account with that email exists'; return; }
    users.push({ name, email, password: pass });
    localStorage.setItem('users', JSON.stringify(users));
    if(errorEl) errorEl.textContent = '';
    alert('Sign up successful — you can now sign in (demo).');
    wrapper.classList.remove('right-panel-active');
  });
}

// Signin (single-page)
const signinForm = document.getElementById('signin-form');
if (signinForm) {
  signinForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = ((document.getElementById('si-email')||{}).value || '').trim().toLowerCase();
    const pass = (document.getElementById('si-password')||{}).value || '';
    const errorEl = document.getElementById('signin-error');
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === pass);
    if (!user) { if(errorEl) errorEl.textContent = 'Invalid credentials'; return; }
    if(errorEl) errorEl.textContent = '';
    localStorage.setItem('loggedInUser', JSON.stringify({ name: user.name, email: user.email }));
    alert('Signed in (demo): ' + user.name);
    window.location.href = '../index.html';
  });
}
