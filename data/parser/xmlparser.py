import xml.etree.ElementTree as ET

import os
import re

from dateutil import parser

from django.contrib.gis.geos import GEOSGeometry

from data.models import Bikes


class XMLParserError(Exception):
    def __init__(self, value):
        self.value = value

    def __str__(self):
        return repr(self.value)


class AlreadyImported(Exception):
    pass


def add_xml_to_db(path):
    tree = ET.parse(path)
    root = tree.getroot()

    filename = os.path.basename(path)
    timestamp_str = os.path.splitext(filename)[0]
    timestamp = parser.parse(timestamp_str.replace('mg-', ''))

    if Bikes.objects.filter(timestamp=timestamp).exists():
        raise AlreadyImported()

    if root.tag != 'markers':
        raise XMLParserError('Expected root "markers"')

    for country in root:
        for city in country:
            for place in city:
                attrs = place.attrib

                lat = attrs['lat']
                lng = attrs['lng']
                place_uid = attrs['uid']
                place_name = attrs['name']

                # number of bikes
                if 'bike_types' in attrs:
                    num_bikes = 0

                    tmp = attrs['bike_types']
                    tmp = tmp.replace('{', '')
                    tmp = tmp.replace('}', '')
                    tmp_list = tmp.split(',')

                    for item in tmp_list:
                        num_bikes += int(item.split(':')[1])
                else:
                    num_bikes = attrs['bikes']

                # bike ids
                bike_ids = None
                if 'bike_numbers' in attrs:
                    tmp = attrs['bike_numbers']
                    bike_ids = tmp.split(',')

                point = GEOSGeometry('POINT({} {})'.format(lng, lat))

                Bikes.objects.create(timestamp=timestamp,
                                     place_uid=place_uid,
                                     place_name=place_name,
                                     place_coords=point,
                                     bikes = num_bikes,
                                     bike_ids = bike_ids)
