// ==========================================
// QFactory
// Digital Factory Frontend
// ==========================================

const API_URL = "https://qfactory.onrender.com";


// ==========================================
// GLOBAL VARIABLES
// ==========================================

let schedule = [];

let statistics = {};

let currentTime = 0;

let timerInterval = null;


// ==========================================
// DOM
// ==========================================

const partsContainer = document.getElementById("partsContainer");

const machineStatusContainer = document.getElementById("machineStatusContainer");

const machineArea = document.getElementById("machineArea");

const timer = document.getElementById("timer");

const makespanLabel = document.getElementById("makespan");

const utilizationLabel = document.getElementById("utilization");

const bottleneckLabel = document.getElementById("bottleneck");

const infoPanel = document.getElementById("informationContent");

const startButton = document.getElementById("startButton");

const pauseButton = document.getElementById("pauseButton");


// ==========================================
// DATA
// ==========================================

const partNames=[

"P101",

"P102",

"P103",

"P104",

"P105",

"P106"

];

const machineNames=[

"CNC-1",

"CNC-2",

"DRILL-1",

"DRILL-2",

"REAMING-1",

"BORING-1",

"DEBURRING-1",

"CLEANING-1",

"RIVETING-1",

"RIVETING-2",

"CMM-1"

];


// ==========================================
// API
// ==========================================

async function loadSchedule(){

    const response=await fetch(API_URL+"/schedule");

    return await response.json();

}

async function loadStatistics(){

    const response=await fetch(API_URL+"/statistics");

    return await response.json();

}


// ==========================================
// CREATE PART CARDS
// ==========================================

function createParts(){

    partsContainer.innerHTML="";

    partNames.forEach(part=>{

        const card=document.createElement("div");

        card.className="partCard";

        card.id=part;

        card.innerHTML=`

            <div class="partTitle">${part}</div>

            <div class="partStatus">

                Waiting...

            </div>

            <div class="progress">

                <div class="progressFill"></div>

            </div>

        `;

        partsContainer.appendChild(card);

    });

}


// ==========================================
// MACHINE STATUS
// ==========================================

function createMachineStatus(){

    machineStatusContainer.innerHTML="";

    machineNames.forEach(machine=>{

        const card=document.createElement("div");

        card.className="machineStatusCard";

        card.id="status-"+machine;

        card.innerHTML=`

            <h3>${machine}</h3>

            <span class="badge badgeIdle">

                IDLE

            </span>

        `;

        machineStatusContainer.appendChild(card);

    });

}


// ==========================================
// KPI
// ==========================================

function updateStatistics(){

    makespanLabel.innerHTML=statistics.makespan;

    bottleneckLabel.innerHTML=statistics.bottleneck;

    makespanLabel.className="good";

    bottleneckLabel.className="danger";

}


// ==========================================
// TIMER
// ==========================================

function startClock(){

    currentTime=0;

    timer.innerHTML="0 min";

    timerInterval=setInterval(()=>{

        currentTime++;

        timer.innerHTML=currentTime+" min";

    },300);

}
