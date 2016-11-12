from django.conf.urls import url

from . import views

app_name = 'evaluation'

urlpatterns = [
    url(r'^$',
        views.index,
        name="index",
    ),
    url(r"""^controlbars/(?P<appName>[a-zA-Z0-9_]+)$""", 
        views.get_app_controlbar,
        name='get_app_controlbar'),

    url(r"""^api/evaluation/(?P<ltlat>[0-9.]+)/(?P<ltlong>[0-9.]+)/"""
         """(?P<rblat>[0-9.]+)/(?P<rblong>[0-9.]+)/"""
         """(?P<date>\d\d\d\d-\d\d-\d\d)/(?P<hour>[0-9.:]+)$""",
        views.update_map,
        name='update_map'),

    url(r"""^api/appPath/(?P<ltlat>[0-9.]+)/(?P<ltlong>[0-9.]+)/"""
         """(?P<rblat>[0-9.]+)/(?P<rblong>[0-9.]+)/(?P<year>[0-9]+)/"""
         """(?P<month>[0-9]+)/(?P<day>[0-9]+)/$""",
        views.path,
        name='path'),
]
