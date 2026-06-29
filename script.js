/*==================================================
QFactory
script.js
PART 1 / 2
==================================================*/

const API_URL="https://qfactory.onrender.com";

let schedule=[];
let statistics={};

let currentMinute=0;
let timer=null;

/*=========================
DOM
=========================*/

const ordersDiv=document.getElementById("orders");

const machinesDiv=document.getElementById("machines");

const info=document.getElementById("informationContent");

const startButton=document.getElementById("startButton");

const bottom=document.getElementById("bottomContent");

/*=========================
DATA
=========================*/

const PARTS={

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

/*=========================
LOAD
=========================*/

window.onload=async()=>{

await loadBackend();

createOrders();

createMachineStatus();

showStatistics();

};

/*=========================
BACKEND
=========================*/

async function loadBackend(){

schedule=await fetch(API_URL+"/schedule")

.then(r=>r.json());

statistics=await fetch(API_URL+"/statistics")

.then(r=>r.json());

}

/*=========================
ORDERS
=========================*/

function createOrders(){

ordersDiv.innerHTML="";

Object.keys(PARTS).forEach(part=>{

const card=document.createElement("div");

card.className="orderCard";

card.id=part;

card.innerHTML=`

${part}

<br>

<span style="font-size:13px">

${PARTS[part]}

</span>

`;

card.onclick=()=>showPart(part);

ordersDiv.appendChild(card);

});

}

/*=========================
RIGHT PANEL
=========================*/

function createMachineStatus(){

machinesDiv.innerHTML="";

MACHINES.forEach(machine=>{

const row=document.createElement("div");

row.className="machineStatus";

row.id="status-"+machine;

row.innerHTML=`

<div>

<span class="machineDot"></span>

${machine}

</div>

<div id="machineCurrent-${machine}">

IDLE

</div>

`;

row.onclick=()=>showMachine(machine);

machinesDiv.appendChild(row);

});

}

/*=========================
PART DETAILS
=========================*/

function showPart(part){

let html="<h2>"+part+"</h2><hr>";

schedule

.filter(x=>x.part===part)

.forEach(op=>{

html+=`

<p>

<b>${op.operation}</b>

<br>

Machine :

${op.machine}

<br>

${op.start} - ${op.finish} min

</p>

<hr>

`;

});

info.innerHTML=html;

}

/*=========================
MACHINE DETAILS
=========================*/

function showMachine(machine){

let html="<h2>"+machine+"</h2><hr>";

schedule

.filter(x=>x.machine===machine)

.forEach(op=>{

html+=`

<p>

<b>${op.part}</b>

<br>

${op.operation}

<br>

${op.start} - ${op.finish}

</p>

<hr>

`;

});

info.innerHTML=html;

}

/*=========================
BOTTOM PANEL
=========================*/

function showStatistics(){

bottom.innerHTML=`

<table>

<tr>

<th>Makespan</th>

<th>Bottleneck</th>

</tr>

<tr>

<td>${statistics.makespan}</td>

<td>${statistics.bottleneck}</td>

</tr>

</table>

`;

}

/*=========================================
SIMULATION
=========================================*/

function getActiveOperations(minute){

    return schedule.filter(op=>{

        return minute>=op.start && minute<op.finish;

    });

}

function resetFactory(){

    Object.keys(PARTS).forEach(part=>{

        document.getElementById(part)

        .classList.remove("orderActive");

        document.getElementById(part)

        .classList.remove("orderFinished");

    });

    MACHINES.forEach(machine=>{

        const status=document.getElementById("status-"+machine);

        status.classList.remove("machineBusy");

        document.getElementById("machineCurrent-"+machine)

        .innerHTML="IDLE";

        const card=document.getElementById(machine);

        if(card){

            card.classList.remove("active");

            card.classList.remove("finished");

            card.querySelector(".currentPart")

            .innerHTML="IDLE";

        }

    });

}

function playMinute(minute){

    resetFactory();

    const active=getActiveOperations(minute);

    active.forEach(op=>{

        /* LEFT ORDER */

        const order=document.getElementById(op.part);

        order.classList.add("orderActive");

        /* RIGHT STATUS */

        const row=document.getElementById(

            "status-"+op.machine

        );

        row.classList.add("machineBusy");

        document.getElementById(

            "machineCurrent-"+op.machine

        ).innerHTML=op.part;

        /* CENTER MACHINE */

        const machine=document.getElementById(op.machine);

        if(machine){

            machine.classList.add("active");

            machine.querySelector(".currentPart")

            .innerHTML=op.part;

        }

    });

}

function finishSimulation(){

    clearInterval(timer);

    timer=null;

    Object.keys(PARTS).forEach(part=>{

        document.getElementById(part)

        .classList.remove("orderActive");

        document.getElementById(part)

        .classList.add("orderFinished");

    });

    MACHINES.forEach(machine=>{

        const card=document.getElementById(machine);

        if(card){

            card.classList.remove("active");

            card.classList.add("finished");

            card.querySelector(".currentPart")

            .innerHTML="READY";

        }

    });

    bottom.innerHTML=`

    <h2>

    Simulation Finished

    </h2>

    <br>

    <table>

    <tr>

    <th>Makespan</th>

    <th>Bottleneck</th>

    </tr>

    <tr>

    <td>${statistics.makespan}</td>

    <td>${statistics.bottleneck}</td>

    </tr>

    </table>

    `;

}

function startSimulation(){

    if(timer) return;

    currentMinute=0;

    timer=setInterval(()=>{

        playMinute(currentMinute);

        currentMinute++;

        if(currentMinute>statistics.makespan){

            finishSimulation();

        }

    },400);

}

/*=========================================
EVENTS
=========================================*/

startButton.onclick=()=>{

    startSimulation();

};
