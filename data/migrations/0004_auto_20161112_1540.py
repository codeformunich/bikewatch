# -*- coding: utf-8 -*-
# Generated by Django 1.10.3 on 2016-11-12 14:40
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('data', '0003_auto_20161112_0005'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bikes',
            name='timestamp',
            field=models.DateTimeField(db_index=True),
        ),
    ]