const app = document.getElementById('app');

const processInfoText = JSON.stringify(window.processInfo, null, 2);
const commanderText = JSON.stringify(window.commander, null, 2);

const pre = document.createElement('pre');
pre.textContent = `${processInfoText}\n${commanderText}`;
app.appendChild(pre);
