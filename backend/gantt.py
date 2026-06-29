import matplotlib.pyplot as plt


def create_gantt(schedule):

    fig, ax = plt.subplots(figsize=(14, 8))

    machines = sorted(list(set(op["machine"] for op in schedule)))

    y_positions = {}

    for i, machine in enumerate(machines):
        y_positions[machine] = i

    colors = {
        "P101": "tab:blue",
        "P102": "tab:orange",
        "P103": "tab:green",
        "P104": "tab:red",
        "P105": "tab:purple",
        "P106": "tab:brown"
    }

    for op in schedule:

        y = y_positions[op["machine"]]

        ax.barh(

            y,

            op["duration"],

            left=op["start"],

            color=colors.get(op["part"], "gray"),

            edgecolor="black"

        )

        ax.text(

            op["start"] + op["duration"]/2,

            y,

            op["part"],

            ha="center",

            va="center",

            fontsize=8,

            color="white"

        )

    ax.set_yticks(list(y_positions.values()))

    ax.set_yticklabels(list(y_positions.keys()))

    ax.set_xlabel("Time (minutes)")

    ax.set_title("QFactory - FIFO Production Schedule")

    plt.tight_layout()

    plt.show()
