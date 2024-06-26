import psycopg2
import click
from flask import Flask, current_app, g
from flask.cli import with_appcontext

app = Flask(__name__)

hostname = 'localhost'
database = 'mydatabase'
username = 'postgres'
pwd = 'kunal@191105'
port_id = 5432

def get_db():
    if 'db' not in g:
        g.db = psycopg2.connect(
            host=hostname,
            dbname=database,
            user=username,
            password=pwd,
            port=port_id
        )
    return g.db

def close_db(e=None):
    db = g.pop('db', None)

    if db is not None:
        db.close()

def init_db():
    db = get_db()
    cursor = db.cursor()

    with current_app.open_resource('schema.sql') as f:
        sql = f.read().decode('utf8')
        cursor.execute(sql)
        db.commit()
    cursor.close()

@click.command('init-db')
@with_appcontext
def init_db_command():
    """Clear the existing data and create new tables."""
    init_db()
    click.echo('Initialized the database.')

def init_app(app):
    app.teardown_appcontext(close_db)
    app.cli.add_command(init_db_command)

if __name__ == '__main__':
    init_app(app)
    app.run()
