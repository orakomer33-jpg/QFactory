const API_URL = "https://qfactory.onrender.com";

document.getElementById('startBtn').addEventListener('click', async () => {
    const res = await fetch(`${API_URL}/schedule`);
    const schedule = await res.json();
    
    // Parçaları ve Makineleri Ekrana Bas
    const partsSet = [...new Set(schedule.map(s => s.part))];
    const machinesSet = [...new Set(schedule.map(s => s.machine))];
    
    partsSet.forEach(p => document.getElementById('parts-list').innerHTML += `<div id="${p}" class="box">${p}</div>`);
    machinesSet.forEach(m => document.getElementById('machines-list').innerHTML += `<div id="${m}" class="box">${m}</div>`);

    // Sayaç Mantığı (Her 3 saniyede 1 dakika)
    let time = 0;
    const timerEl = document.getElementById('timer');
    
    const interval = setInterval(() => {
        time++;
        timerEl.innerText = `${time} min`;

        // İşlemde olanları kontrol et
        schedule.forEach(op => {
            const partEl = document.getElementById(op.part);
            const machEl = document.getElementById(op.machine);

            if (time >= op.start && time < op.finish) {
                partEl.classList.add('busy');
                machEl.classList.add('busy');
            } else if (time === op.finish) {
                partEl.classList.remove('busy');
                machEl.classList.remove('busy');
            }
        });

        if (time > 200) clearInterval(interval); // Örnek limit
    }, 3000);
});
