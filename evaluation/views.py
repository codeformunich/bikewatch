from django.http import HttpResponse
from django.shortcuts import render
from django.contrib.gis.geos import Polygon

from data.models import Bikes

import json
import os.path
from django.template import loader


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


def update_map(request, ltlat, ltlong, rblat, rblong, date, hour):
    # Long: 11, lat: 48
    # Example: http://localhost:8000/api/evaluation/48/11.55/49/12/1/1
    data = Bikes.objects.filter(place_coords__within=Polygon
        .from_bbox((ltlong, ltlat, rblong, rblat)))[:100]
    #data = Bikes.objects.all()[:10]

    result = []
    for b in data:
        result.append({
            "long": b.place_coords[0],
            "lat": b.place_coords[1],
            "count": b.bikes,
        })

    json_str = json.dumps(result)
    return HttpResponse(json_str, content_type='application/json')
