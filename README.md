Install
=======

    pyvenv .
    . ./bin/activate


    git clone git@gitlab.lrz.de:ga73vuy/hackatum.git

    cd hackatum

    pip install -r requirements.txt

    python manage.py migrate
    python manage.py bower install
    python manage.py runserver

Database
========

 * PostgreSQL 9.2+
 * PostGIS

    psql <db name>
    CREATE EXTENSION postgis;

Celery
======

Run Celery worker:

    celery -A mvgrad worker -c 2 --loglevel=info

Import and generate data
========================

Import XML data:

    python manage.py import *.xml


Calculate the data for the "Routes of Bikes" for one day:

    python manage.py generate_path <year> <month> <day>


After every change in the dataset (after one of the commands above):

    python manage.py generate_available_dates_cache
