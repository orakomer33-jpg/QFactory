from scheduler import FIFOScheduler

scheduler = FIFOScheduler()

result = scheduler.schedule()

print()

print("===== FIFO SCHEDULE =====")

print()

for row in result:

    print(row)
