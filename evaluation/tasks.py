from __future__ import absolute_import, unicode_literals
from celery import shared_task

import datetime

from .generators import generate_path_data

@shared_task
def task_path(year, month, day):
    generate_path_data(datetime.date(year, month, day))
