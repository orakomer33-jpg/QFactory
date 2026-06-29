const parts=[

"Wing Bracket",

"Frame Support",

"Spar Joint",

"Stringer Bracket",

"Bulkhead Plate",

"Seat Rail Support"

]

const machines=[

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

]

const orderDiv=document.getElementById("orders")

parts.forEach(part=>{

const card=document.createElement("div")

card.innerHTML=part

card.className="card"

orderDiv.appendChild(card)

})

const machineDiv=document.getElementById("machines")

machines.forEach(machine=>{

const card=document.createElement("div")

card.innerHTML="🟢 "+machine

card.className="machine"

machineDiv.appendChild(card)

})

const startButton=document.getElementById("startButton");

startButton.addEventListener("click",startSimulation);

function startSimulation(){

async function startSimulation(){

activateMachine("CNC-1")

await sleep(2000)

deactivateMachine("CNC-1")

activateMachine("DRILL-1")

await sleep(2000)

deactivateMachine("DRILL-1")

activateMachine("REAMING")

await sleep(2000)

deactivateMachine("REAMING")

activateMachine("BORING")

await sleep(2000)

deactivateMachine("BORING")

activateMachine("DEBURRING")

await sleep(2000)

deactivateMachine("DEBURRING")

activateMachine("CLEANING")

await sleep(2000)

deactivateMachine("CLEANING")

activateMachine("RIVETING-1")

await sleep(2000)

deactivateMachine("RIVETING-1")

activateMachine("CMM")

await sleep(2000)

deactivateMachine("CMM")

}

}

function activateMachine(id){

document.getElementById(id).style.background="#d32f2f";

}

function deactivateMachine(id){

document.getElementById(id).style.background="#43a047";

}

function sleep(ms){

return new Promise(resolve=>setTimeout(resolve,ms))

}
