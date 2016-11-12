# -*- coding: utf-8 -*-
# Generated by Django 1.10.3 on 2016-11-12 10:37
from __future__ import unicode_literals

import django.contrib.gis.db.models.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('evaluation', '0002_remove_bikepath_path'),
    ]

    operations = [
        migrations.AddField(
            model_name='bikepath',
            name='path',
            field=django.contrib.gis.db.models.fields.MultiPointField(default=[], srid=4326),
            preserve_default=False,
        ),
    ]
