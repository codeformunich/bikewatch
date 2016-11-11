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
            print(repr(city))
