from dataclasses import dataclass


@dataclass
class Operation:

    machine: str

    duration: int


@dataclass
class ScheduledOperation:

    part: str

    machine: str

    start: int

    finish: int
