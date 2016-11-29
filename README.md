# Bikewatch

Visualize bike data in munich

## Dependencies

 * Python3 + virtualenv
 * npm
 * bower
 * PostgreSQL 9.2+
 * Redis
 * PostGIS

## Setup
```
git clone https://github.com/codeformunich/bikewatch
cd bikewatch
virtualenv -p python3 .
pip install -r requirements.txt
python manage.py bower install
```

Now you have to configure the database connection and connection for Redis.
Edit this in mvgrad/settings.py:

    DATABASES = {
        'default': {
            'ENGINE': 'django.contrib.gis.db.backends.postgis',
            'NAME': 'dbname',
            'USER': 'dbuser',
            'PASSWORD': 'dbpassword',
            'HOST': 'localhost',
        }
    }

    CELERY_BROKER_URL = 'redis://:redispw@localhost:6379/0'

Then you should crate the database and activate the PostGIS extension:

    python manage.py migrate

    psql <db name>
    CREATE EXTENSION postgis;

Now you have to start the Celery worker (this is a asynchronous task worker):

    celery -A mvgrad worker -c 2 --loglevel=info

Before using the software, we have to create the cache:

    python manage.py generate_available_dates_cache

Finally you can start the development server:

    python manage.py runserver


Maybe these install instructions for PostGIS are helpful:
https://docs.djangoproject.com/en/1.10/ref/contrib/gis/install/


## Working with the data

We use the data from https://data.robbi5.com/nextbike-mvgrad/.

To import the XML files use this command:

    python manage.py import *.xml


To calculate the data for the "Routes of Bikes" for one day, run this:

    python manage.py generate_path <year> <month> <day>


**After every change** in the dataset (after one of the commands above):

    python manage.py generate_available_dates_cache
