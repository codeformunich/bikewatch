from .models import Bikes

def get_bike_ids_for_day(date):
    entries = Bikes.objects.filter(timestamp__date=date)

    ids = set()
    for entry in entries:
        if entry.bike_ids:
            ids.update(entry.bike_ids)

    return ids

def get_stations():
    return Bikes.objects.exclude(place_name__contains="BIKE").distinct(). \
        values('place_name')
