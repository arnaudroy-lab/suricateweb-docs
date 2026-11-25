// Vidéos YouTube « au clic » : la page ne contacte YouTube qu'après un clic sur « Lire la vidéo » (aucune requête tierce à l'affichage).
// Sans JavaScript, il reste le lien « Ouvrir sur YouTube » écrit dans la page. L'iframe passe par youtube-nocookie.com
// (seul domaine tiers autorisé par la politique de sécurité : voir security-headers.conf, frame-src).
(() => {
  for (const box of document.querySelectorAll('.video-embed[data-youtube]')) {
    const id = box.dataset.youtube;
    if (!/^[\w-]{11}$/.test(id)) continue; // identifiant douteux : on laisse le lien seul
    const title = box.dataset.title || '';
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'video-play';
    const icon = document.createElement('span');
    icon.setAttribute('aria-hidden', 'true');
    icon.textContent = '▶';
    const label = document.createElement('span');
    label.className = 'video-label';
    label.textContent = `${box.dataset.play || 'Play'} : ${title}`;
    button.append(icon, label);
    const note = document.createElement('small');
    note.className = 'video-note';
    note.textContent = box.dataset.privacy || '';
    button.addEventListener('click', () => {
      const frame = document.createElement('iframe');
      frame.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
      frame.title = title;
      frame.allow = 'accelerometer; autoplay; encrypted-media; picture-in-picture; fullscreen';
      frame.allowFullscreen = true;
      frame.referrerPolicy = 'strict-origin-when-cross-origin';
      frame.loading = 'lazy';
      box.classList.add('is-playing');
      box.replaceChildren(frame);
      frame.focus();
    });
    box.classList.add('is-ready');
    box.prepend(button, note);
  }
})();
