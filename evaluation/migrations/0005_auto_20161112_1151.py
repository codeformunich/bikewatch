# -*- coding: utf-8 -*-
# Generated by Django 1.10.3 on 2016-11-12 10:51
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('evaluation', '0004_auto_20161112_1148'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bikepath',
            name='date',
            field=models.DateField(db_index=True),
        ),
    ]