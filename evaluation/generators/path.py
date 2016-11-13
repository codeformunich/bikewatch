from django.contrib.gis.geos import MultiPoint

from data.models import Bikes
from data.helpers import get_path, get_bike_ids_for_day
from ..models import BikePath

def generate_path_data(date):
    ids = get_bike_ids_for_day(date)

    results = []

    for cur_id in ids:
        path, min_date, max_date = get_path(cur_id, date)

        obj = BikePath(date=date, bike_id=cur_id, path=MultiPoint(path))
        results.append(obj)

    BikePath.objects.bulk_create(results)
