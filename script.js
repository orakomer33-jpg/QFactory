const API_URL = "https://qfactory.onrender.com";
const canvas = document.getElementById('flowCanvas');
const ctx = canvas.getContext('2d');
ctx.lineWidth = 4; // Çizgiler artık kalın

window.onload = async () => {
    const res = await fetch(`${API_URL}/schedule`);
    const schedule = await res.json();
    const parts = [...new Set(schedule.map(s => s.part))];
    const machines = [...new Set(schedule.map(s => s.machine))];
    
    parts.forEach(p => document.getElementById('parts-list').innerHTML += `<div id="${p}" class="box">${p}</div>`);
    machines.forEach(m => document.getElementById('machines-list').innerHTML += `<div id="${m}" class="box">${m}</div>`);
    canvas.width = window.innerWidth;
    canvas.height = 800;
};

document.getElementById('startBtn').addEventListener('click', async () => {
    const res = await fetch(`${API_URL}/schedule`);
    const schedule = await res.json();
    const totalOps = schedule.length;
    let time = 0;

    const interval = setInterval(() => {
        time++;
        document.getElementById('timer').innerText = `${time} min`;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        schedule.forEach(op => {
            const pEl = document.getElementById(op.part);
            const mEl = document.getElementById(op.machine);

            if (time >= op.start && time < op.finish) {
                pEl.classList.add('busy');
                mEl.classList.add('busy');
                
                ctx.beginPath();
                ctx.strokeStyle = '#ff5252';
                const pRect = pEl.getBoundingClientRect();
                const mRect = mEl.getBoundingClientRect();
                ctx.moveTo(pRect.right, pRect.top + pRect.height/2);
                ctx.lineTo(mRect.left, mRect.top + mRect.height/2);
                ctx.stroke();
            } else if (time >= op.finish) {
                pEl.classList.remove('busy');
                mEl.classList.remove('busy');
            }
        });

        let finishedOps = schedule.filter(s => time >= s.finish).length;
        let percent = Math.min(Math.round((finishedOps / totalOps) * 100), 100);
        document.getElementById('progress-bar').style.width = percent + "%";
        document.getElementById('progress-bar').innerText = percent + "%";

        if (percent >= 100) clearInterval(interval);
    }, 1000);
});
