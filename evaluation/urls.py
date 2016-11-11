from django.conf.urls import url

from . import views

app_name = 'evaluation'

urlpatterns = [
    url(r'^$',
        views.index,
        name="index",
    ),
    url(r"""^/api/evaluation/points?lt=<lat,lng>&
        rb=<lat,lng>&date=<a>&hour=<int>$""", 
        views.update_map, 
        name='update_map'),
]
