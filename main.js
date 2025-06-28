async function loadModule(id, file) {
  const res = await fetch(`${file}?v=${Date.now()}`);
  document.getElementById(id).innerHTML = await res.text();
}

async function init() {
  await Promise.all([
    loadModule('header', 'modules/header.html'),
    loadModule('main', 'modules/main.html'),
    loadModule('footer', 'modules/footer.html')
  ]);

  const scriptText = await fetch(`modules/script.js?v=${Date.now()}`).then(r => r.text());
  const scriptEl = document.createElement('script');
  scriptEl.textContent = scriptText;
  document.body.appendChild(scriptEl);
}

window.addEventListener('DOMContentLoaded', init);
