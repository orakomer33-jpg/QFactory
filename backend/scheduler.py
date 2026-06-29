from data import MACHINES
from data import PROCESS_PLAN

class FIFOScheduler:

    def __init__(self):

        self.machine_available = {}

        # Fabrikadaki her makinenin her fiziksel kopyasını oluştur
        for machine_type, count in MACHINES.items():

            self.machine_available[machine_type] = []

            for i in range(count):

                self.machine_available[machine_type].append({
                    "name": f"{machine_type}-{i+1}",
                    "available": 0
                })


    def get_available_machine(self, machine_type):

        machines = self.machine_available[machine_type]

        return min(machines, key=lambda x: x["available"])

    def schedule(self):

        schedule = []

        part_finish_time = {}

        for part in PROCESS_PLAN.keys():

            part_finish_time[part] = 0

        for part, operations in PROCESS_PLAN.items():

            for machine_type, duration in operations:

                machine = self.choose_machine(machine_type)

                start = max(

                    part_finish_time[part],

                    machine["available"]

                )

                finish = start + duration

                schedule.append({

                    "part": part,

                    "machine": machine["name"],

                    "operation": machine_type,

                    "start": start,

                    "finish": finish

                })

                machine["available"] = finish

                part_finish_time[part] = finish

        return schedule

    def choose_machine(self, machine_type):

        machines = self.machine_available[machine_type]
    
        earliest = machines[0]
    
        for m in machines:
    
            if m["available"] < earliest["available"]:
    
                earliest = m
    
        return earliest

    def calculate_utilization(self):

        utilization = {}
    
        for machine_type in self.machine_available:
    
            for machine in self.machine_available[machine_type]:
    
                utilization[machine["name"]] = machine["available"]
    
        return utilization
