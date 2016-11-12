from django.core.management.base import BaseCommand, CommandError

from evaluation.tasks import task_available_dates_cache

class Command(BaseCommand):
    help = 'Generate cache for available dates'

    def handle(self, *args, **options):
        task_available_dates_cache.delay()

        print("Scheduled task")
