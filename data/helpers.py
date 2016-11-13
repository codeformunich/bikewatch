from .models import Bikes

def get_bike_ids_for_day(date):
    entries = Bikes.get_for_day(date)

    ids = set()
    for entry in entries:
        if entry.bike_ids:
            ids.update(entry.bike_ids)

    return ids

def get_stations():
    return Bikes.objects.exclude(place_name__contains="BIKE").distinct(). \
        values('place_name')

def get_path(bike_id, date=None):
    if date:
        bikes = Bikes.get_for_day(date)
    else:
        bikes = Bikes.objects

    tmp = bikes.filter(bike_ids__contains=[bike_id]).order_by('timestamp')

    path = []

    last_station_uid = None
    for cur in tmp:
        if cur.place_uid != last_station_uid:
            path.append(cur.place_coords)

            last_station_uid = cur.place_uid

    if tmp.count() > 0:
        min_date = tmp[0].timestamp.strftime("%Y-%m-%d")
        max_date = tmp.reverse()[0].timestamp.strftime("%Y-%m-%d")
    else:
        min_date = None
        max_date = None

    return path, min_date, max_date
