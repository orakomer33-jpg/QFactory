import plotly.express as px
import pandas as pd


def create_gantt(schedule):

    rows = []

    for op in schedule:

        rows.append({

            "Machine": op["machine"],

            "Part": op["part"],

            "Start": op["start"],

            "Finish": op["finish"],

            "Operation": op["operation"]

        })

    df = pd.DataFrame(rows)

    fig = px.timeline(

        df,

        x_start="Start",

        x_end="Finish",

        y="Machine",

        color="Part",

        hover_data=["Operation"]

    )

    fig.update_yaxes(autorange="reversed")

    fig.update_layout(

        title="Aircraft Production Schedule",

        xaxis_title="Time (minutes)",

        yaxis_title="Machines",

        template="plotly_white"

    )

    fig.show()
