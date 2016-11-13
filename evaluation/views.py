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
from data.helpers import get_path
from evaluation.models import BikePath, TextCache

import json
import datetime


def index(request):
    context = {}

    return render(request, 'evaluation/index.html', context)


def get_app_controlbar(request, appName):
    # calculate initial date depending on appName
    initial_date = None
    if appName == "appPath":
        initial_date = TextCache.objects.get(key='path_dates_newest').text
    elif appName == "appView":
        initial_date = TextCache.objects.get(key='view_dates_newest').text

    context = {'initial_date': initial_date}

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
    date = datetime.datetime.strptime(date, "%Y-%m-%d")

    points = Bikes.get_for_day(date).filter(timestamp__hour=int(hour)).all()

    result = []
    for p in points:
        result.append({
            "long": p.place_coords.get_x(),
            "lat": p.place_coords.get_y(),
            "count": p.bikes,
        })

    json_str = json.dumps({
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
    data, min_date, max_date = get_path(bike_uid)

    result_list = []
    for p in data:
        result_list.append((p.get_x(), p.get_y()))

    result = {'data': result_list,
              'max_date': max_date,
              'min_date': min_date}

    json_str = json.dumps(result)
    return HttpResponse(json_str, content_type='application/json')

def stats(request, statistic):
    result = []
    statistic = int(statistic)
    if statistic == 1:
        # Count the amount of currently free vehicles
        result = [{
            "type": "line",
            "data": {
                "labels": ["1", "2", "3", "4"],
                "datasets": [{
                    "label": "Available vehicles",
                    "data": [10, 20, 5, 2]
                }]
            },
            "options": {
                "scales": {
                    "xAxes": [{
                        "type": 'linear',
                        "position": 'bottom'
                    }]
                }
            }
        }]

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
    