from django.core.management.base import BaseCommand, CommandError

from data.parser import add_xml_to_db

class Command(BaseCommand):
    help = 'Import XML file to database'

    def add_arguments(self, parser):
        parser.add_argument('xml_path', type=str)

    def handle(self, *args, **options):
        add_xml_to_db(options['xml_path'])
