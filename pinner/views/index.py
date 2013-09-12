from pinner import app, db
from flask import Blueprint, render_template
from random import randint

blueprint = Blueprint("index", __name__)

@blueprint.route("/")
def index():
	pins = [randint(50, 200) for x in range(1, 100)]
	return render_template("index.jinja", pins = pins)

app.register_blueprint(blueprint)