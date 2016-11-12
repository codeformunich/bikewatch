from django.contrib.gis.geos import Polygon
from django.db.models.functions.datetime import TruncDate
from django.http import HttpResponse
from django.shortcuts import render
from django.template import loader

from django.db.models import Count
from django.contrib.gis.db.models.functions import Distance
from django.db.models import Avg, Max, Min
from django.contrib.gis.geos import Point
from django.contrib.gis.measure import D

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

    points = Bikes.get_for_day(date).all()

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


def follow(request, ltlat, ltlong, rblat, rblong, bike_uid):
    data = get_path(bike_uid)

    result = []
    for p in data:
        result.append((p.get_x(), p.get_y()))

    json_str = json.dumps(result)
    return HttpResponse(json_str, content_type='application/json')

def probability(request,ltlat, ltlong, rblat, rblong ,poslat, poslong, dayindex, hourindex):
    
    #dayindex starts with 1 for sunday, see https://docs.djangoproject.com/en/dev/ref/models/querysets/#week-day
    
    loc = Point(float(poslong),float(poslat),srid=4326 ) #fixme: check that srid=4326 is right
    print(loc)
    result = Bikes.objects.filter(timestamp__week_day=dayindex).filter(timestamp__hour=hourindex).filter(bikes__gt=0)\
        .extra({'date_found' : "date(timestamp)"}).values('date_found')\
        .annotate(min_distance=Min(Distance('place_coords', loc))).order_by('min_distance')
    result_count = len(result)
    
    
    result_ranges = {}
    percentages = [0.25,0.50,0.75,0.90]
    p_ind = 0
    for i in range(result_count): # this finds the minimum distance for which the percentages from the list are fullfiled for bike availability
        percentage_sum = (i+1)/result_count
        while p_ind < len(percentages):
            if percentages[p_ind] <= percentage_sum:
                result_ranges[str(percentages[p_ind])]=result[i]["min_distance"]
                p_ind+=1
            else:
                break
    return HttpResponse(json.dumps(result_ranges), content_type='application/json')
    