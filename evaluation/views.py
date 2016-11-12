from django.http import HttpResponse
from django.shortcuts import render
from django.template import loader

from data.models import Bikes
from data.helpers import get_path
from evaluation.models import BikePath, TextCache

import json
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
    return render(request, template_name, context)


def view(request, ltlat, ltlong, rblat, rblong, date, hour):
#    def deg_to_rad(deg):
#        return deg * 2*math.pi / 360
#
#    # Compute degree for 100 m
#    MUNICH_TL_LONG = 11.4
#    MUNICH_TL_LAT = 48.25
#
#    MUNICH_BR_LONG = 11.81
#    MUNICH_BR_LAT = 48.03
#
#    #MUNICH_LONG = deg_to_rad(11.5820)
#    #MUNICH_LAT = deg_to_rad(48.1351)
#    GRID_LONG = 1 / MUNICH_LONG * math.cos(MUNICH_LAT) * 0.1
#    GRID_LAT = 1 / MUNICH_LAT * 0.1
#
#
    date = datetime.datetime.strptime(date, "%Y-%m-%d")
#    hour = int(hour)
#
#    # Example: http://localhost:8000/api/evaluation/48/11.55/49/12/2016-07-05/15
#    # Fetch all data for the given time
#    data = Bikes.get_for_day(date).filter(timestamp__hour=hour, timestamp__minute=0)
#    # Send all data
#    #data = all_data.filter(place_coords__within=
#    #    Polygon.from_bbox((ltlong, ltlat, rblong, rblat)))
#
#    # Accumulate points by coordinates in the GRID_* raster
#    # points is a dictionary from points (long, lat) → count
#    points = {}
#    for b in data:
#        if b.bikes > 0:
#            #pos = round_position(b.place_coords[0], b.place_coords[1])
#            pos = (b.place_coords[0] - (b.place_coords[0] % GRID_LONG), b.place_coords[1] - (b.place_coords[1] % GRID_LAT))
#            if pos in points.keys():
#                points[pos] += b.bikes
#            else:
#                points[pos] = b.bikes

    points = Bikes.get_for_day(date).filter(timestamp__hour=int(hour)).all()

    result = []
    for p in points:
        result.append({
            "long": p.place_coords.get_x(),
            "lat": p.place_coords.get_y(),
            "count": 1,
        })

    #result = []
    #for p in points:
    #    result.append({
    #        "long": p[0] + GRID_LONG / 2,
    #        "lat": p[1] + GRID_LAT / 2,
    #        "count": points[p],
    #    })

    json_str = json.dumps({
        "grid_size_long": 0,
        "grid_size_lat": 0,
        #"grid_size_long": GRID_LONG,
        #"grid_size_lat": GRID_LAT,
        "grid_size_meter": 100,
        "data": result
    })
    return HttpResponse(json_str, content_type='application/json')


def view_dates(request):
    json_str = TextCache.objects.get(key='view_dates').text
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
    json_str = TextCache.objects.get(key='path_dates').text
    return HttpResponse(json_str, content_type='application/json')


def follow(request, ltlat, ltlong, rblat, rblong, bike_uid):
    data = get_path(bike_uid)

    result = []
    for p in data:
        result.append((p.get_x(), p.get_y()))

    json_str = json.dumps(result)
    return HttpResponse(json_str, content_type='application/json')
