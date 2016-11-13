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

    # evaluation
    url(r"""^api/appView/(?P<ltlat>[0-9.]+)/(?P<ltlong>[0-9.]+)/"""
         """(?P<rblat>[0-9.]+)/(?P<rblong>[0-9.]+)/"""
         """(?P<date>\d\d\d\d-\d\d-\d\d)/(?P<hour>[0-9.:]+)$""",
        views.view,
        name='view'),

    url(r"""^api/appView/available_dates/$""",
        views.view_dates,
        name='view_dates'),

    # appPath
    url(r"""^api/appPath/(?P<ltlat>[0-9.]+)/(?P<ltlong>[0-9.]+)/"""
         """(?P<rblat>[0-9.]+)/(?P<rblong>[0-9.]+)/"""
         """(?P<date>\d\d\d\d-\d\d-\d\d)/$""",
        views.path,
        name='path'),

    url(r"""^api/appPath/available_dates/$""",
        views.path_dates,
        name='path_dates'),

    # appFollow
    url(r"""^api/appFollow/(?P<ltlat>[0-9.]+)/(?P<ltlong>[0-9.]+)/"""
         """(?P<rblat>[0-9.]+)/(?P<rblong>[0-9.]+)/"""
         """(?P<bike_uid>\w+)/$""",
        views.follow,
        name='follow'),
    
     # appProbability
    url(r"""^api/appProbability/(?P<ltlat>[0-9.]+)/(?P<ltlong>[0-9.]+)/"""
         """(?P<rblat>[0-9.]+)/(?P<rblong>[0-9.]+)/(?P<poslat>[0-9.]+)/(?P<poslong>[0-9.]+)/"""
         """(?P<dayindex>[1-7])/(?P<hourindex>[0-9]+)$""",
        views.probability,
        name='probability'),
]
