from django.http import HttpResponse
from django.shortcuts import render
from django.contrib.gis.geos import Polygon

from data.models import Bikes

import json



def index(request):
    context = {}

    return render(request, 'evaluation/index.html', context)


def update_map(request, ltlat, ltlong, rblat, rblong, date, hour):
    data = []
    #ltlat = ltlong = rblat = rblong = 40
    #data = Bikes.objects.filter(rast__contains=Polygon
    #    .from_bbox((ltlat, ltlong, rblat, rblong)))
    data = Bikes.objects.all()[:10]

    result = []
    for b in data:
        result.append({
            "long": b.place_coords[0],
            "lat": b.place_coords[1],
            "count": b.bikes,
        })

    json_str = json.dumps(result)
    return HttpResponse(json_str, content_type='application/json')
