from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from scheduler import FIFOScheduler

app = FastAPI(title="QFactory API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():

    return {
        "project": "QFactory",
        "status": "running"
    }


@app.get("/schedule")
def schedule():

    scheduler = FIFOScheduler()

    result = scheduler.schedule()

    return result


@app.get("/statistics")
def statistics():

    scheduler = FIFOScheduler()

    scheduler.schedule()

    return scheduler.calculate_statistics()
