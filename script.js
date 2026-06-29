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

alert("Simulation Started");

}
