from django.db.models.functions.datetime import TruncDate

from data.models import Bikes
from evaluation.models import BikePath, TextCache

import json


def generate_available_dates_cache():
    #
    # appView
    #
    dates = Bikes.objects.annotate(date=TruncDate('timestamp')) \
        .values('date').distinct()

    dates = sorted([d['date'].strftime("%Y-%m-%d") for d in dates])

    json_str = json.dumps(dates)

    cache, _ = TextCache.objects.get_or_create(key='view_dates')
    cache.text = json_str
    cache.save()

    # newest date
    cache, _ = TextCache.objects.get_or_create(key='view_dates_newest')
    if dates:
        cache.text = dates[-1]
    else:
        cache.text = ""
    cache.save()

    #
    # appPath
    #
    dates = BikePath.objects.values('date').distinct()

    dates = sorted([d['date'].strftime("%Y-%m-%d") for d in dates])

    json_str = json.dumps(dates)

    # list
    cache, _ = TextCache.objects.get_or_create(key='path_dates')
    cache.text = json_str
    cache.save()

    # newest date
    cache, _ = TextCache.objects.get_or_create(key='path_dates_newest')
    if dates:
        cache.text = dates[-1]
    else:
        cache.text = ""
    cache.save()
