from data import MACHINES
from data import PARTS
from data import PROCESS_PLAN


print("========== QFactory ==========")

print()

print("Factory Machines")

print(MACHINES)

print()

print("Aircraft Parts")

print(PARTS)

print()

print("Process Plans")

for part, operations in PROCESS_PLAN.items():

    print(part, operations)
