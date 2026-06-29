from scheduler import FIFOScheduler
from gantt import create_gantt

scheduler = FIFOScheduler()

schedule = scheduler.schedule()
stats = scheduler.calculate_statistics(schedule)
print()

print("===== SCHEDULE =====")

for row in schedule:

    print(row)

print()

print("===== MACHINE TIMES =====")

print(scheduler.calculate_utilization())
create_gantt(schedule)
print()

print("========== KPI ==========")

print()

print("Makespan")

print(stats["makespan"], "minutes")

print()

print("Bottleneck")

print(stats["bottleneck"])

print()

print("Machine Utilization")

for machine, value in stats["utilization"].items():

    print(machine, ":", value, "%")

print()

print("Idle Time")

for machine, value in stats["idle"].items():

    print(machine, ":", value, "minutes")
