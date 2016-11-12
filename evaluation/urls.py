from django.conf.urls import url

from . import views

app_name = 'evaluation'

urlpatterns = [
    url(r'^$',
        views.index,
        name="index",
    ),
    url(r"""^api/evaluation/(?P<ltlat>[0-9.]+)/(?P<ltlong>[0-9.]+)/(?P<rblat>[0-9.]+)/(?P<rblong>[0-9.]+)/(?P<date>[0-9.]+)/(?P<hour>[0-9.:]+)$""", 
        views.update_map, 
        name='update_map'),
]
