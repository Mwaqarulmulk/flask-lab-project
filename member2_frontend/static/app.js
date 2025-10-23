document.addEventListener('DOMContentLoaded', () => {
  const healthBtn = document.getElementById('health-btn');
  const healthRes = document.getElementById('health-res');
  const form = document.getElementById('data-form');
  const resp = document.getElementById('resp');
  const prettyBtn = document.getElementById('pretty-btn');

  healthBtn.addEventListener('click', async () => {
    healthRes.textContent = 'checking...';
    try {
      const r = await fetch('/health');
      healthRes.textContent = r.ok ? `${r.status} OK` : `${r.status}`;
    } catch (err) {
      healthRes.textContent = 'error';
    }
  });

  prettyBtn.addEventListener('click', () => {
    const example = { message: 'hello from frontend', at: new Date().toISOString() };
    document.getElementById('json-input').value = JSON.stringify(example, null, 2);
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    resp.textContent = 'sending...';
    let payload = {};
    try {
      payload = JSON.parse(document.getElementById('json-input').value || '{}');
    } catch (err) {
      resp.textContent = `invalid JSON: ${err.message}`;
      return;
    }

    try {
      const r = await fetch('/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await r.json();
      resp.textContent = JSON.stringify(data, null, 2);
    } catch (err) {
      resp.textContent = `request error: ${err.message}`;
    }
  });
});
