/*====================================================
QFactory Digital Twin
Simple Version
====================================================*/

const API_URL="https://qfactory.onrender.com";

let schedule=[];
let statistics={};

let currentMinute=0;
let simulation=null;

const partsContainer=document.getElementById("partsContainer");
const machineStatusContainer=document.getElementById("machineStatusContainer");
const informationContent=document.getElementById("informationContent");

const timer=document.getElementById("timer");
const makespan=document.getElementById("makespan");
const utilization=document.getElementById("utilization");
const bottleneck=document.getElementById("bottleneck");

const startButton=document.getElementById("startButton");
const pauseButton=document.getElementById("pauseButton");

const PARTS=[
"P101",
"P102",
"P103",
"P104",
"P105",
"P106"
];

const PART_NAMES={

P101:"Wing Bracket",
P102:"Frame Support",
P103:"Spar Joint",
P104:"Stringer Bracket",
P105:"Bulkhead Plate",
P106:"Seat Rail Support"

};

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

window.onload=async()=>{

await loadBackend();

createParts();

createMachinePanel();

updateStatistics();

informationContent.innerHTML=

"<h2>Ready</h2><br>Press START.";

};

async function loadBackend(){

schedule=
await fetch(API_URL+"/schedule")
.then(r=>r.json());

statistics=
await fetch(API_URL+"/statistics")
.then(r=>r.json());

}

function updateStatistics(){

makespan.innerHTML=

statistics.makespan;

bottleneck.innerHTML=

statistics.bottleneck;

let total=0;

let count=0;

for(let key in statistics.utilization){

total+=statistics.utilization[key];

count++;

}

utilization.innerHTML=

(total/count).toFixed(1)+"%";

}

function createParts(){

partsContainer.innerHTML="";

PARTS.forEach(part=>{

const card=document.createElement("div");

card.className="partCard";

card.id=part;

card.innerHTML=`

<div class="partTitle">

${part}

</div>

<div style="font-size:13px">

${PART_NAMES[part]}

</div>

<div class="partStatus">

Waiting...

</div>

<div class="progress">

<div class="progressFill"

id="${part}-progress">

</div>

</div>

`;

card.onclick=()=>showPart(part);

partsContainer.appendChild(card);

});

}

function createMachinePanel(){

machineStatusContainer.innerHTML="";

MACHINES.forEach(machine=>{

const card=document.createElement("div");

card.className="machineStatusCard";

card.innerHTML=`

<h3>${machine}</h3>

<div class="badge badgeIdle"

id="badge-${machine}">

IDLE

</div>

<div id="machine-part-${machine}"

style="margin-top:10px">

-

</div>

<div class="progress">

<div class="progressFill"

id="machine-progress-${machine}">

</div>

</div>

`;

machineStatusContainer.appendChild(card);

});

}

function showPart(part){

let html="<h2>"+part+"</h2><br>";

schedule

.filter(x=>x.part==part)

.forEach(op=>{

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

});

informationContent.innerHTML=html;

}

/*====================================================
SIMULATION
====================================================*/

function getActiveOperations(minute){

    return schedule.filter(op=>{

        return minute>=op.start && minute<op.finish;

    });

}

function resetFactory(){

    PARTS.forEach(part=>{

        const card=document.getElementById(part);

        card.classList.remove("partActive");
        card.classList.remove("partFinished");

        card.querySelector(".partStatus").innerHTML="Waiting...";

        document.getElementById(part+"-progress").style.width="0%";

    });

    MACHINES.forEach(machine=>{

        document.getElementById("badge-"+machine).className="badge badgeIdle";

        document.getElementById("badge-"+machine).innerHTML="IDLE";

        document.getElementById("machine-part-"+machine).innerHTML="-";

        document.getElementById("machine-progress-"+machine).style.width="0%";

        const card=document.getElementById(machine);

        if(card){

            card.classList.remove("machineActive");

        }

    });

}

function updateFactory(minute){

    resetFactory();

    timer.innerHTML=minute+" min";

    const active=getActiveOperations(minute);

    active.forEach(op=>{

        /* PART */

        const part=document.getElementById(op.part);

        part.classList.add("partActive");

        part.querySelector(".partStatus").innerHTML=

        op.operation;

        const p=((minute-op.start)/(op.finish-op.start))*100;

        document.getElementById(op.part+"-progress")

        .style.width=Math.min(100,p)+"%";



        /* MACHINE PANEL */

        document.getElementById("badge-"+op.machine)

        .className="badge badgeBusy";

        document.getElementById("badge-"+op.machine)

        .innerHTML="RUNNING";

        document.getElementById("machine-part-"+op.machine)

        .innerHTML=op.part;



        document.getElementById("machine-progress-"+op.machine)

        .style.width=Math.min(100,p)+"%";



        /* MACHINE CARD */

        const machine=document.getElementById(op.machine);

        if(machine){

            machine.classList.add("machineActive");

            machine.querySelector(".currentPart")

            .innerHTML=op.part;

        }

    });

}

function finishSimulation(){

    clearInterval(simulation);

    simulation=null;

    PARTS.forEach(part=>{

        document.getElementById(part)

        .classList.remove("partActive");

        document.getElementById(part)

        .classList.add("partFinished");

    });

    informationContent.innerHTML=`

    <h2>

    Simulation Finished

    </h2>

    <br>

    Makespan :

    ${statistics.makespan}

    <br><br>

    Bottleneck :

    ${statistics.bottleneck}

    <br><br>

    Average Utilization :

    ${utilization.innerHTML}

    `;

}

function startSimulation(){

    if(simulation) return;

    currentMinute=0;

    simulation=setInterval(()=>{

        updateFactory(currentMinute);

        currentMinute++;

        if(currentMinute>statistics.makespan){

            finishSimulation();

        }

    },400);

}



/*====================================================
EVENTS
====================================================*/

startButton.onclick=()=>{

    startSimulation();

};

pauseButton.onclick=()=>{

    if(simulation){

        clearInterval(simulation);

        simulation=null;

    }

};



/*====================================================
MACHINE CLICK
====================================================*/

MACHINES.forEach(machine=>{

    const card=document.getElementById(machine);

    if(card){

        card.onclick=()=>{

            let html="<h2>"+machine+"</h2><br>";

            schedule

            .filter(x=>x.machine==machine)

            .forEach(op=>{

                html+=`

                <p>

                <b>${op.part}</b>

                <br>

                ${op.operation}

                <br>

                ${op.start} - ${op.finish} min

                </p>

                <hr>

                `;

            });

            informationContent.innerHTML=html;

        };

    }

});
