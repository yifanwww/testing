const app = document.getElementById('app');

const pre = document.createElement('pre');
pre.textContent = JSON.stringify(window.processInfo, null, 2);
app.appendChild(pre);
