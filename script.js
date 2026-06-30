const API_URL = "https://qfactory.onrender.com";
const canvas = document.getElementById('flowCanvas');
const ctx = canvas.getContext('2d');

// 1. Sayfa açılır açılmaz oluştur
async function initFactory() {
    const res = await fetch(`${API_URL}/schedule`);
    const schedule = await res.json();
    const parts = [...new Set(schedule.map(s => s.part))];
    const machines = [...new Set(schedule.map(s => s.machine))];
    
    parts.forEach(p => document.getElementById('parts-list').innerHTML += `<div id="${p}" class="box">${p}</div>`);
    machines.forEach(m => document.getElementById('machines-list').innerHTML += `<div id="${m}" class="box">${m}</div>`);
    canvas.width = window.innerWidth;
    canvas.height = 800;
}

function drawLine(partId, machId) {
    const pEl = document.getElementById(partId).getBoundingClientRect();
    const mEl = document.getElementById(machId).getBoundingClientRect();
    ctx.beginPath();
    ctx.strokeStyle = 'red';
    ctx.moveTo(pEl.right, pEl.top + pEl.height/2);
    ctx.lineTo(mEl.left, mEl.top + mEl.height/2);
    ctx.stroke();
}

document.getElementById('startBtn').addEventListener('click', async () => {
    const res = await fetch(`${API_URL}/schedule`);
    const schedule = await res.json();
    let time = 0;

    const interval = setInterval(() => {
        time++;
        document.getElementById('timer').innerText = `${time} min`;
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Çizgileri temizle

        schedule.forEach(op => {
            const pEl = document.getElementById(op.part);
            const mEl = document.getElementById(op.machine);

            if (time >= op.start && time < op.finish) {
                pEl.classList.add('busy');
                mEl.classList.add('busy');
                drawLine(op.part, op.machine); // Çizgiyi çek
            } else {
                pEl.classList.remove('busy');
                mEl.classList.remove('busy');
            }
        });
        if (time > 200) clearInterval(interval);
    }, 1000); // 1 saniye = 1 dakika
});

window.onload = initFactory;
