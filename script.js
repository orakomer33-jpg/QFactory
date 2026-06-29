// ======================================================
// QFactory
// Aircraft Manufacturing Digital Twin
// ======================================================

const API_URL = "https://qfactory.onrender.com";

let schedule = [];
let statistics = {};

let currentMinute = 0;
let timerInterval = null;


// ======================================================
// DOM
// ======================================================

const partsContainer=document.getElementById("partsContainer");

const machineArea=document.getElementById("machineArea");

const informationContent=document.getElementById("informationContent");

const ganttChart=document.getElementById("ganttChart");

const timer=document.getElementById("timer");

const startButton=document.getElementById("startButton");

const pauseButton=document.getElementById("pauseButton");

const makespan=document.getElementById("makespan");

const utilization=document.getElementById("utilization");

const bottleneck=document.getElementById("bottleneck");


// ======================================================
// DATA
// ======================================================

const PARTS=[

"P101",

"P102",

"P103",

"P104",

"P105",

"P106"

];

const MACHINES=[

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


// ======================================================
// API
// ======================================================

async function getSchedule(){

    const response=await fetch(API_URL+"/schedule");

    schedule=await response.json();

}

async function getStatistics(){

    const response=await fetch(API_URL+"/statistics");

    statistics=await response.json();

}


// ======================================================
// PARTS
// ======================================================

function buildParts(){

    partsContainer.innerHTML="";

    PARTS.forEach(part=>{

        const card=document.createElement("div");

        card.className="partCard";

        card.id=part;

        card.innerHTML=`

        <div class="partTitle">

        ${part}

        </div>

        <div class="partStatus">

        Waiting

        </div>

        <div class="progress">

        <div class="progressFill"></div>

        </div>

        `;

        card.onclick=()=>showPart(part);

        partsContainer.appendChild(card);

    });

}


// ======================================================
// MACHINES
// ======================================================

function buildMachines(){

    machineArea.innerHTML="";

    MACHINES.forEach(machine=>{

        const card=document.createElement("div");

        card.className="machineCard";

        card.id=machine;

        card.innerHTML=`

        <h3>

        ${machine}

        </h3>

        <div class="currentPart">

        IDLE

        </div>

        <div class="progress">

        <div class="progressFill"></div>

        </div>

        `;

        card.onclick=()=>showMachine(machine);

        machineArea.appendChild(card);

    });

}


// ======================================================
// KPI
// ======================================================

function updateDashboard(){

    makespan.innerHTML=statistics.makespan;

    bottleneck.innerHTML=statistics.bottleneck;

    utilization.innerHTML=

    Math.round(

        Object.values(statistics.utilization)

        .reduce((a,b)=>a+b)

        /

        Object.keys(statistics.utilization).length

    )

    +" %";

}


// ======================================================
// TIMER
// ======================================================

function startClock(){

    currentMinute=0;

    timer.innerHTML="0 min";

    clearInterval(timerInterval);

    timerInterval=setInterval(()=>{

        currentMinute++;

        timer.innerHTML=currentMinute+" min";

    },250);

}

function stopClock(){

    clearInterval(timerInterval);

}


// ======================================================
// INFORMATION PANEL
// ======================================================

function showPart(part){

    let html="<h3>"+part+"</h3>";

    schedule.forEach(op=>{

        if(op.part==part){

            html+=`

            <p>

            <b>${op.operation}</b>

            <br>

            ${op.machine}

            <br>

            ${op.start} - ${op.finish} min

            </p>

            <hr>

            `;

        }

    });

    informationContent.innerHTML=html;

}

function showMachine(machine){

    let html="<h3>"+machine+"</h3>";

    schedule.forEach(op=>{

        if(op.machine==machine){

            html+=`

            <p>

            <b>${op.part}</b>

            <br>

            ${op.operation}

            <br>

            ${op.start}-${op.finish} min

            </p>

            <hr>

            `;

        }

    });

    informationContent.innerHTML=html;

}

// ======================================================
// MACHINE STATUS
// ======================================================

function setMachineBusy(machine,part){

    const card=document.getElementById(machine);

    if(!card) return;

    card.classList.add("machineActive");

    card.classList.remove("machineIdle");

    card.querySelector(".currentPart").innerHTML=part;

}

function setMachineIdle(machine){

    const card=document.getElementById(machine);

    if(!card) return;

    card.classList.remove("machineActive");

    card.classList.add("machineIdle");

    card.querySelector(".currentPart").innerHTML="IDLE";

}



// ======================================================
// PART STATUS
// ======================================================

function setPartBusy(part,operation){

    const card=document.getElementById(part);

    card.classList.add("partActive");

    card.querySelector(".partStatus").innerHTML=

    "Processing : "+operation;

}

function setPartFinished(part){

    const card=document.getElementById(part);

    card.classList.remove("partActive");

    card.classList.add("partFinished");

    card.querySelector(".partStatus").innerHTML=

    "Finished";

}



// ======================================================
// SVG CONNECTION
// ======================================================

function drawConnection(part,machine){

    const svg=document.getElementById("factorySvg");

    svg.innerHTML="";

    const line=document.createElementNS(

        "http://www.w3.org/2000/svg",

        "line"

    );

    line.setAttribute("x1","40");

    line.setAttribute("y1","40");

    line.setAttribute("x2","500");

    line.setAttribute("y2","220");

    line.setAttribute("class","connection");

    svg.appendChild(line);

}



// ======================================================
// REMOVE CONNECTION
// ======================================================

function clearConnection(){

    document.getElementById("factorySvg").innerHTML="";

}



// ======================================================
// PROGRESS
// ======================================================

function updatePartProgress(part,value){

    const fill=document

    .getElementById(part)

    .querySelector(".progressFill");

    fill.style.width=value+"%";

}



function updateMachineProgress(machine,value){

    const fill=document

    .getElementById(machine)

    .querySelector(".progressFill");

    fill.style.width=value+"%";

}



// ======================================================
// WAIT
// ======================================================

function sleep(ms){

    return new Promise(resolve=>setTimeout(resolve,ms));

}



// ======================================================
// PLAY SCHEDULE
// ======================================================

async function playSchedule(){

    startClock();

    for(const op of schedule){

        setPartBusy(

            op.part,

            op.operation

        );

        setMachineBusy(

            op.machine,

            op.part

        );

        drawConnection(

            op.part,

            op.machine

        );

        for(

            let i=0;

            i<=100;

            i+=10

        ){

            updatePartProgress(

                op.part,

                i

            );

            updateMachineProgress(

                op.machine,

                i

            );

            await sleep(70);

        }

        setMachineIdle(

            op.machine

        );

        clearConnection();

    }

    stopClock();

    PARTS.forEach(part=>{

        setPartFinished(part);

    });

}



// ======================================================
// GANTT
// ======================================================

function drawGantt(){

    const data=[];

    schedule.forEach(op=>{

        data.push({

            x:[

                op.finish-op.start

            ],

            y:[

                op.machine

            ],

            base:op.start,

            orientation:"h",

            type:"bar",

            name:op.part

        });

    });

    Plotly.newPlot(

        "ganttChart",

        data,

        {

            paper_bgcolor:"#243246",

            plot_bgcolor:"#243246",

            font:{

                color:"white"

            },

            barmode:"stack"

        }

    );

}



// ======================================================
// START
// ======================================================

async function startSimulation(){

    startButton.disabled=true;

    await getSchedule();

    await getStatistics();

    buildParts();

    buildMachines();

    updateDashboard();

    drawGantt();

    await playSchedule();

    startButton.disabled=false;

}



// ======================================================
// EVENTS
// ======================================================

startButton.onclick=()=>{

    startSimulation();

};



pauseButton.onclick=()=>{

    stopClock();

};



// ======================================================
// INIT
// ======================================================

window.onload=()=>{

    buildParts();

    buildMachines();

};

