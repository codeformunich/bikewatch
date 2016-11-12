from django.contrib.gis.geos import Polygon
from django.db.models.functions.datetime import TruncDate
from django.http import HttpResponse
from django.shortcuts import render
from django.template import loader

from data.models import Bikes
from evaluation.models import BikePath

import json
import math
import datetime


def index(request):
    context = {}

    return render(request, 'evaluation/index.html', context)


def get_app_controlbar(request, appName):
    context = {}
    if not appName.isalnum():
        return HttpResponse(status=400)

    template_name = 'evaluation/app_controlbars/' + appName + '.html'
    loader.get_template(template_name)
    try:
        loader.get_template(template_name)
    except:
        return HttpResponse(status=404)
    return render(request,template_name,context)


def view(request, ltlat, ltlong, rblat, rblong, date, hour):
    # Compute degree for 100 m
    MUNICH_LONG = 11.5820
    MUNICH_LAT = 48.1351
    GRID_LONG = 1 / MUNICH_LONG * abs(math.cos(MUNICH_LAT)) * 0.1
    GRID_LAT = 1 / MUNICH_LAT * 0.1

    # Round position to a raster with the GRID_* accuracy
    def round_position(lng, lat):
        (lng - (lng % GRID_LONG), lat - (lat % GRID_LAT))


    date = datetime.datetime.strptime(date, "%Y-%m-%d")
    hour = int(hour)

    # Example: http://localhost:8000/api/evaluation/48/11.55/49/12/2016-07-05/15
    # Fetch all data for the given time
    data = Bikes.get_for_day(date).filter(timestamp__hour=hour, timestamp__minute=0)
    # Send all data
    #data = all_data.filter(place_coords__within=
    #    Polygon.from_bbox((ltlong, ltlat, rblong, rblat)))

    # Accumulate points by coordinates in the GRID_* raster
    # points is a dictionary from points (long, lat) → count
    points = {}
    for b in data:
        if b.bikes > 0:
            #pos = round_position(b.place_coords[0], b.place_coords[1])
            pos = (b.place_coords[0] - (b.place_coords[0] % GRID_LONG), b.place_coords[1] - (b.place_coords[1] % GRID_LAT))
            if pos in points.keys():
                points[pos] += b.bikes
            else:
                points[pos] = b.bikes

    result = []
    for p in points:
        result.append({
            "long": p[0] + GRID_LONG / 2,
            "lat": p[1] + GRID_LAT / 2,
            "count": points[p],
        })

    json_str = json.dumps({
        "grid_size_long": GRID_LONG,
        "grid_size_lat": GRID_LAT,
        "grid_size_meter": 100,
        "data": result
    })
    return HttpResponse(json_str, content_type='application/json')


def view_dates(request):
    dates = Bikes.objects.annotate(date=TruncDate('timestamp')) \
        .values('date').distinct()

    dates = sorted([d['date'].strftime("%Y-%m-%d") for d in dates])

    json_str = json.dumps(dates)
    return HttpResponse(json_str, content_type='application/json')


def path(request, ltlat, ltlong, rblat, rblong, date):
    date = datetime.datetime.strptime(date, "%Y-%m-%d")
    data = BikePath.objects.filter(date=date)

    result = []
    for b in data:
        result.append({
            "id": b.bike_id,
            "path": [(p.get_x(), p.get_y()) for p in b.path],
        })

    json_str = json.dumps(result)
    return HttpResponse(json_str, content_type='application/json')

def path_dates(request):
    dates = BikePath.objects.values('date').distinct()

    dates = sorted([d['date'].strftime("%Y-%m-%d") for d in dates])

    json_str = json.dumps(dates)
    return HttpResponse(json_str, content_type='application/json')
