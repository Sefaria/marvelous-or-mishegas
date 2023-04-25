#! /bin/bash
createdb marvelousdb
psql -f setup_db.sql marvelousdb
