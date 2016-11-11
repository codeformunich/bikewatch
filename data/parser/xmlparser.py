import xml.etree.ElementTree as ET


class XMLParserError(Exception):
    def __init__(self, value):
        self.value = value

    def __str__(self):
        return repr(self.value)


def add_xml_to_db(path):
    tree = ET.parse(path)
    root = tree.getroot()

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
