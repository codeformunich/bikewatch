# -*- coding: utf-8 -*-
# Generated by Django 1.10.3 on 2016-11-11 23:05
from __future__ import unicode_literals

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('data', '0002_auto_20161111_2229'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bikes',
            name='bike_ids',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=10), null=True, size=None),
        ),
    ]
