document.addEventListener('DOMContentLoaded', () => {
  const cacheBuster = new Date().getTime();

  // Atualiza links de CSS
  document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
    const href = link.getAttribute('href');
    if (href) {
      const separator = href.includes('?') ? '&' : '?';
      link.setAttribute('href', `${href}${separator}v=${cacheBuster}`);
    }
  });

  // Atualiza scripts JS
  document.querySelectorAll('script[src]').forEach(script => {
    const src = script.getAttribute('src');
    if (src) {
      const separator = src.includes('?') ? '&' : '?';
      script.setAttribute('src', `${src}${separator}v=${cacheBuster}`);
    }
  });

  // Atualiza imagens
  document.querySelectorAll('img[src]').forEach(img => {
    const src = img.getAttribute('src');
    if (src) {
      const separator = src.includes('?') ? '&' : '?';
      img.setAttribute('src', `${src}${separator}v=${cacheBuster}`);
    }
  });
});
