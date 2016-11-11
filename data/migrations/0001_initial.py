# -*- coding: utf-8 -*-
# Generated by Django 1.10.3 on 2016-11-11 21:24
from __future__ import unicode_literals

import django.contrib.gis.db.models.fields
import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Bikes',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('timestamp', models.DateTimeField()),
                ('place_uid', models.IntegerField()),
                ('place_name', models.CharField(max_length=200)),
                ('place_coords', django.contrib.gis.db.models.fields.PointField(srid=4326)),
                ('bikes', models.IntegerField()),
                ('bike_ids', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=10), size=None)),
            ],
        ),
    ]
