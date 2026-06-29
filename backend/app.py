from scheduler import FIFOScheduler
from gantt import create_gantt

scheduler = FIFOScheduler()

schedule = scheduler.schedule()

print()

print("===== SCHEDULE =====")

for row in schedule:

    print(row)

print()

print("===== MACHINE TIMES =====")

print(scheduler.calculate_utilization())
create_gantt(schedule)
