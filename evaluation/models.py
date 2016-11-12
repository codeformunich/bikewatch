from django.contrib.gis.db import models

class BikePath(models.Model):
    class Meta:
        unique_together = (('date', 'bike_id', ), )

    date = models.DateField(db_index=True)

    bike_id = models.CharField(max_length=10)

    path = models.MultiPointField()


class TextCache(models.Model):
    key = models.CharField(
        max_length=255,
        db_index=True,
    )

    text = models.TextField()
