from django.contrib.gis.db import models
from django.contrib.postgres.fields import ArrayField

class Bikes(models.Model):
    class Meta:
        unique_together = (('timestamp', 'place_uid', 'place_coords',
                            'place_name',),)

    timestamp = models.DateTimeField()

    place_uid = models.IntegerField()

    place_name = models.CharField(
        max_length=200,
    )

    place_coords = models.PointField()

    bikes = models.IntegerField()

    bike_ids = ArrayField(
        models.CharField(max_length=10),
    )
