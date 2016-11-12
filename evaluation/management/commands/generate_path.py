from django.core.management.base import BaseCommand, CommandError

import datetime

from evaluation.generators import generate_path_data

from evaluation.tasks import task_path

class Command(BaseCommand):
    help = 'Generate data for path analysis'

    def add_arguments(self, parser):
        parser.add_argument('year', type=int)
        parser.add_argument('month', type=int)
        parser.add_argument('day', type=int)

    def handle(self, *args, **options):
        year = int(options['year'])
        month = int(options['month'])
        day = int(options['day'])

        task_path.delay(year, month, day)

        print("Scheduled task")
