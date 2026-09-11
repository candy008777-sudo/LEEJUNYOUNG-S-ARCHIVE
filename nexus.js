document.addEventListener('DOMContentLoaded', () => {
  const colors = document.querySelector('.nexus-colors');
  if (colors) {
    const preview = colors.querySelector('img');
    const targets = [...colors.querySelectorAll('button')];
    const assets = targets.map(button => {
      const asset = new Image();
      asset.src = `images/nexus/nexus_4-${button.dataset.state}.webp`;
      return asset;
    });
    let colorRequest = 0;
    const select = async (button, index) => {
      const ticket = ++colorRequest;
      try { await assets[index].decode(); } catch { return; }
      if (ticket !== colorRequest) return;
      preview.src = assets[index].src;
      preview.alt = `${button.getAttribute('aria-label')} 색상 미리보기`;
      targets.forEach(target => target.setAttribute('aria-pressed', String(target === button)));
    };
    targets.forEach((button, index) => {
      button.addEventListener('pointerenter', event => {
        if (event.pointerType !== 'touch') select(button, index);
      });
      button.addEventListener('focus', () => select(button, index));
      button.addEventListener('click', () => select(button, index));
    });
  }
  const panel = document.querySelector('.nexus-values');
  const image = panel.querySelector('img');
  const buttons = [...panel.querySelectorAll('button')];
  const sources = new Map();
  let request = 0;
  for (let state = 1; state <= 6; state++) {
    const asset = new Image();
    asset.src = `images/nexus/nexus_2-${state}.webp`;
    sources.set(String(state), asset);
  }
  async function show(state) {
    const ticket = ++request;
    const asset = sources.get(String(state));
    try { await asset.decode(); } catch { return; }
    if (ticket !== request) return;
    image.src = asset.src;
  }
  buttons.forEach(button => {
    button.addEventListener('pointerenter', event => {
      if (event.pointerType !== 'touch') show(button.dataset.state);
    });
    button.addEventListener('focus', () => show(button.dataset.state));
    button.addEventListener('click', () => show(button.dataset.state));
  });
  panel.addEventListener('pointerleave', () => show(1));
  panel.addEventListener('focusout', event => {
    if (!panel.contains(event.relatedTarget)) show(1);
  });
  panel.addEventListener('pointermove', event => {
    if (event.target === image) show(1);
  });
});
