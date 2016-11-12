from __future__ import absolute_import, unicode_literals
from celery import shared_task

from .generators import generate_path_data

@shared_task
def task_path_data(date):
    generate_path_data(date)
