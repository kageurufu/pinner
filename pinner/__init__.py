from flask import Flask
from flask.ext.mongokit import MongoKit
import random
import os

PROJECT_ROOT = os.path.dirname(os.path.realpath(__file__))

app = Flask(__name__, static_folder=os.path.join(PROJECT_ROOT, 'public'), static_url_path='/public')
app.config.from_pyfile("settings.py")

db = MongoKit(app)

from pinner.models import *
from pinner.views import *