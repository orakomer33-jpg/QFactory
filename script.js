// =====================================
// QFactory Frontend
// =====================================

const API_URL = "https://qfactory.onrender.com";

const parts = [
    "Wing Bracket",
    "Frame Support",
    "Spar Joint",
    "Stringer Bracket",
    "Bulkhead Plate",
    "Seat Rail Support"
];

const machines = [
    "CNC-1",
    "CNC-2",
    "DRILL-1",
    "DRILL-2",
    "REAMING",
    "BORING",
    "DEBURRING",
    "CLEANING",
    "RIVETING-1",
    "RIVETING-2",
    "CMM"
];

const orderDiv = document.getElementById("orders");
const machineDiv = document.getElementById("machines");
const startButton = document.getElementById("startButton");
const simulationArea = document.getElementById("simulationArea");

// ----------------------
// Üretim emirlerini oluştur
// ----------------------

parts.forEach(part => {

    const card = document.createElement("div");

    card.className = "card";

    card.innerHTML = part;

    orderDiv.appendChild(card);

});

// ----------------------
// Makine listesini oluştur
// ----------------------

machines.forEach(machine => {

    const card = document.createElement("div");

    card.className = "machine";

    card.innerHTML = "🟢 " + machine;

    machineDiv.appendChild(card);

});

// ----------------------
// Buton
// ----------------------

startButton.addEventListener("click", startSimulation);

// =====================================
// API
// =====================================

async function loadSchedule(){

    const response = await fetch(API_URL + "/schedule");

    return await response.json();

}

async function loadStatistics(){

    const response = await fetch(API_URL + "/statistics");

    return await response.json();

}

// =====================================
// Simulation
// =====================================

async function startSimulation(){

    startButton.disabled = true;

    simulationArea.innerHTML = "<h3>Loading production plan...</h3>";

    try{

        const schedule = await loadSchedule();

        const statistics = await loadStatistics();

        console.log(schedule);

        console.log(statistics);

        showSchedule(schedule);

        showStatistics(statistics);

    }

    catch(error){

        console.error(error);

        alert("Backend bağlantısı kurulamadı.");

    }

    startButton.disabled = false;

}

// =====================================
// Schedule Table
// =====================================

function showSchedule(schedule){

    let html = `
        <h3>Classical FIFO Schedule</h3>

        <table border="1" cellpadding="6">

        <tr>

            <th>Part</th>

            <th>Machine</th>

            <th>Operation</th>

            <th>Start</th>

            <th>Finish</th>

        </tr>
    `;

    schedule.forEach(op=>{

        html += `
        <tr>

            <td>${op.part}</td>

            <td>${op.machine}</td>

            <td>${op.operation}</td>

            <td>${op.start}</td>

            <td>${op.finish}</td>

        </tr>
        `;

    });

    html += "</table>";

    simulationArea.innerHTML = html;

}

// =====================================
// Statistics
// =====================================

function showStatistics(stats){

    simulationArea.innerHTML += `

    <br><br>

    <h3>Production Statistics</h3>

    <p><b>Makespan:</b> ${stats.makespan}</p>

    <p><b>Bottleneck:</b> ${stats.bottleneck}</p>

    <p><b>Operations:</b> ${stats.operations}</p>

    <p><b>Parts:</b> ${stats.parts}</p>

    `;

}
