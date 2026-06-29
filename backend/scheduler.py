from data import MACHINES
from data import PROCESS_PLAN


class FIFOScheduler:

    def __init__(self):

        self.machine_available = {}

        self.schedule_result = []

        self.part_finish_time = {}

        # Fabrikadaki fiziksel makineleri oluştur
        for machine_type, count in MACHINES.items():

            self.machine_available[machine_type] = []

            for i in range(count):

                self.machine_available[machine_type].append({

                    "name": f"{machine_type}-{i+1}",

                    "available": 0

                })

    # ---------------------------------------------------------

    def choose_machine(self, machine_type):

        machines = self.machine_available[machine_type]

        return min(machines, key=lambda x: x["available"])

    # ---------------------------------------------------------

    def schedule(self):

        self.schedule_result = []

        self.part_finish_time = {}

        for part in PROCESS_PLAN:

            self.part_finish_time[part] = 0

        for part, operations in PROCESS_PLAN.items():

            for machine_type, duration in operations:

                machine = self.choose_machine(machine_type)

                start = max(

                    self.part_finish_time[part],

                    machine["available"]

                )

                finish = start + duration

                operation = {

                    "part": part,

                    "machine": machine["name"],

                    "operation": machine_type,

                    "start": start,

                    "finish": finish,

                    "duration": duration

                }

                self.schedule_result.append(operation)

                machine["available"] = finish

                self.part_finish_time[part] = finish

        return self.schedule_result

    # ---------------------------------------------------------

    def makespan(self):

        if len(self.schedule_result) == 0:

            return 0

        return max(

            op["finish"]

            for op in self.schedule_result

        )

    # ---------------------------------------------------------

    def machine_utilization(self):

        makespan = self.makespan()

        utilization = {}

        if makespan == 0:

            return utilization

        machine_busy = {}

        for operation in self.schedule_result:

            machine = operation["machine"]

            duration = operation["duration"]

            machine_busy[machine] = machine_busy.get(machine, 0) + duration

        for machine, busy in machine_busy.items():

            utilization[machine] = round(

                busy / makespan * 100,

                2

            )

        return utilization

    # ---------------------------------------------------------

    def calculate_statistics(self):

        makespan = self.makespan()

        utilization = self.machine_utilization()

        machine_busy = {}

        idle = {}

        bottleneck = None

        max_busy = -1

        for operation in self.schedule_result:

            machine = operation["machine"]

            machine_busy[machine] = machine_busy.get(

                machine,

                0

            ) + operation["duration"]

        for machine, busy in machine_busy.items():

            idle[machine] = makespan - busy

            if busy > max_busy:

                max_busy = busy

                bottleneck = machine

        return {

            "makespan": makespan,

            "utilization": utilization,

            "idle": idle,

            "bottleneck": bottleneck,

            "operations": len(self.schedule_result),

            "parts": len(PROCESS_PLAN)

        }
