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

  await Promise.all([
    loadModule('pillar1-placeholder', 'modules/pillar1.html'),
    loadModule('pillar2-placeholder', 'modules/pillar2.html'),
    loadModule('pillar3-placeholder', 'modules/pillar3.html'),
    loadModule('pillar4-placeholder', 'modules/pillar4.html'),
    loadModule('pillar5-placeholder', 'modules/pillar5.html'),
    loadModule('interactive-placeholder', 'modules/interactive.html')
  ]);

  const scriptText = await fetch(`modules/script.js?v=${Date.now()}`).then(r => r.text());
  const scriptEl = document.createElement('script');
  scriptEl.textContent = scriptText;
  document.body.appendChild(scriptEl);
}

window.addEventListener('DOMContentLoaded', init);
