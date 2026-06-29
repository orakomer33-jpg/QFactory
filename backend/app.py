from scheduler import FIFOScheduler

scheduler = FIFOScheduler()

schedule = scheduler.schedule()

print()

print("===== SCHEDULE =====")

for row in schedule:

    print(row)

print()

print("===== MACHINE TIMES =====")

print(scheduler.calculate_utilization())
