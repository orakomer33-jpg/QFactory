"""
QFactory
Aircraft Production Planning Data
"""

# Fabrikadaki makineler

MACHINES = {
    "CNC": 2,
    "DRILL": 2,
    "REAMING": 1,
    "BORING": 1,
    "DEBURRING": 2,
    "CLEANING": 1,
    "RIVETING": 2,
    "CMM": 1
}

PARTS = {

    "P101": "Wing Bracket",

    "P102": "Frame Support",

    "P103": "Spar Joint",

    "P104": "Stringer Bracket",

    "P105": "Bulkhead Plate",

    "P106": "Seat Rail Support"

}



PROCESS_PLAN = {

"P101":[

("CNC",22),

("DRILL",18),

("REAMING",12),

("BORING",15),

("DEBURRING",8),

("CLEANING",5),

("RIVETING",18),

("CMM",10)

],

"P102":[

("CNC",30),

("DRILL",25),

("REAMING",15),

("BORING",20),

("DEBURRING",7),

("CLEANING",5),

("RIVETING",14),

("CMM",10)

],

"P103":[

("CNC",35),

("DRILL",16),

("REAMING",10),

("BORING",12),

("DEBURRING",9),

("CLEANING",5),

("RIVETING",20),

("CMM",10)

],

"P104":[

("CNC",18),

("DRILL",28),

("REAMING",18),

("BORING",16),

("DEBURRING",10),

("CLEANING",5),

("RIVETING",16),

("CMM",10)

],

"P105":[

("CNC",25),

("DRILL",20),

("REAMING",15),

("BORING",18),

("DEBURRING",7),

("CLEANING",5),

("RIVETING",22),

("CMM",10)

],

"P106":[

("CNC",32),

("DRILL",24),

("REAMING",16),

("BORING",15),

("DEBURRING",8),

("CLEANING",5),

("RIVETING",18),

("CMM",10)

]

}
