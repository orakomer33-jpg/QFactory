from scheduler import FIFOScheduler
from gantt import create_gantt
scheduler = FIFOScheduler()

schedule = scheduler.schedule()

stats = scheduler.calculate_statistics()

print("\n========== SCHEDULE ==========\n")

for row in schedule:

    print(row)

print("\n========== STATISTICS ==========\n")

for key, value in stats.items():

    print(key, ":", value)
create_gantt(schedule)
