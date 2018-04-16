
from flask import Flask, render_template
import psycopg2
import psycopg2.extras

app = Flask(__name__)

def get_conn():
    # The raspberry pi has been set up to allow peer authentication locally, and we've created a database
    # and a role with the same name as the linux user we're running this script as. Therefore we can use an
    # empty connection string.
    # See for details: http://initd.org/psycopg/docs/module.html#psycopg2.connect
    return psycopg2.connect('')

@app.route('/')
def hello_world():
  get_conn()
  return render_template('controll_scene.html')

if __name__ == '__main__':
  app.run()
