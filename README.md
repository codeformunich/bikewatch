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

PostgreSQL 9.2+
PostGIS

psql <db name>
CREATE EXTENSION postgis;
