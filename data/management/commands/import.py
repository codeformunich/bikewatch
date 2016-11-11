from django.core.management.base import BaseCommand, CommandError

from data.parser import add_xml_to_db, XMLParserError, AlreadyImported

class Command(BaseCommand):
    help = 'Import XML file to database'

    def add_arguments(self, parser):
        parser.add_argument('xml_path', nargs='+', type=str)

    def handle(self, *args, **options):
        for path in options['xml_path']:
            try:
                add_xml_to_db(path)
            except AlreadyImported:
                print("Already imported: {}".format(path))
            except XMLParserError as e:
                print('XML Error in "{}": {}'.format(path, str(e)))
