const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const contactForm = document.querySelector('[data-contact-form]');
const contactStatus = document.querySelector('[data-contact-status]');

menuToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks?.addEventListener('click', (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    navLinks.classList.remove('is-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  }
});

contactForm?.addEventListener('submit', async (event) => {
  event.preventDefault();

  const submitButton = contactForm.querySelector('button[type="submit"]');
  const formData = new FormData(contactForm);

  setContactStatus('Envoi en cours...', false);
  submitButton?.setAttribute('disabled', 'disabled');

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.get('name'),
        email: formData.get('email'),
        service: formData.get('service'),
        message: formData.get('message'),
      }),
    });

    const result = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(result?.error || 'Contact request failed');
    }

    contactForm.reset();
    setContactStatus('Merci, votre demande a bien été envoyée. Nous reviendrons vers vous rapidement.');
  } catch (error) {
    setContactStatus(error instanceof Error ? error.message : 'Une erreur est survenue. Veuillez réessayer.');
  } finally {
    submitButton?.removeAttribute('disabled');
  }
});

function setContactStatus(message, isFinal = true) {
  if (!contactStatus) {
    return;
  }

  contactStatus.textContent = message;
  contactStatus.hidden = false;
  contactStatus.dataset.state = isFinal ? 'complete' : 'loading';
}
