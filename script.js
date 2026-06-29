// ===============================
// QFactory
// Aircraft Manufacturing Simulator
// ===============================

// Production Orders

const parts = [
    "Wing Bracket",
    "Frame Support",
    "Spar Joint",
    "Stringer Bracket",
    "Bulkhead Plate",
    "Seat Rail Support"
];

// Factory Machines

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

// -------------------------------
// Production Orders
// -------------------------------

const orderDiv = document.getElementById("orders");

parts.forEach(part => {

    const card = document.createElement("div");

    card.innerHTML = part;

    card.className = "card";

    orderDiv.appendChild(card);

});

// -------------------------------
// Machine Status
// -------------------------------

const machineDiv = document.getElementById("machines");

machines.forEach(machine => {

    const card = document.createElement("div");

    card.innerHTML = "🟢 " + machine;

    card.className = "machine";

    card.id = "status-" + machine;

    machineDiv.appendChild(card);

});

// -------------------------------
// Button
// -------------------------------

const startButton = document.getElementById("startButton");

startButton.addEventListener("click", startSimulation);

// -------------------------------
// Machine Color Functions
// -------------------------------

function activateMachine(id){

    const machine = document.getElementById(id);

    if(machine){

        machine.style.background = "#d32f2f";

    }

}

function deactivateMachine(id){

    const machine = document.getElementById(id);

    if(machine){

        machine.style.background = "#43a047";

    }

}

// -------------------------------
// Sleep
// -------------------------------

function sleep(ms){

    return new Promise(resolve => setTimeout(resolve, ms));

}

// -------------------------------
// Simulation
// -------------------------------

async function startSimulation(){

    startButton.disabled = true;

    // CNC

    activateMachine("CNC-1");

    await sleep(1500);

    deactivateMachine("CNC-1");

    // DRILL

    activateMachine("DRILL-1");

    await sleep(1500);

    deactivateMachine("DRILL-1");

    // REAMING

    activateMachine("REAMING");

    await sleep(1500);

    deactivateMachine("REAMING");

    // BORING

    activateMachine("BORING");

    await sleep(1500);

    deactivateMachine("BORING");

    // DEBURRING

    activateMachine("DEBURRING");

    await sleep(1500);

    deactivateMachine("DEBURRING");

    // CLEANING

    activateMachine("CLEANING");

    await sleep(1500);

    deactivateMachine("CLEANING");

    // RIVETING

    activateMachine("RIVETING-1");

    await sleep(1500);

    deactivateMachine("RIVETING-1");

    // CMM

    activateMachine("CMM");

    await sleep(1500);

    deactivateMachine("CMM");

    startButton.disabled = false;

}
