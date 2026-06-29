from collections import defaultdict


class FactorySimulation:

    def __init__(self, schedule):

        self.schedule = schedule

        self.timeline = defaultdict(list)

        self.build()
    def build(self):

        for row in self.schedule:

            self.timeline[row["start"]].append({

                "type": "START",

                "part": row["part"],

                "machine": row["machine"],

                "operation": row["operation"]

            })

            self.timeline[row["finish"]].append({

                "type": "FINISH",

                "part": row["part"],

                "machine": row["machine"],

                "operation": row["operation"]

            })
    def play(self):

        for time in sorted(self.timeline.keys()):

            print()

            print("="*40)

            print("TIME :", time)

            print("="*40)

            for event in self.timeline[time]:

                print(event)
