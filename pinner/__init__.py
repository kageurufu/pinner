from flask import Flask, render_template
import random

app = Flask(__name__)

app.config['DEBUG'] = True

@app.route("/")
def index():
	pins = [random.randint(50,200) for x in range(1,50)]
	return render_template("index.jinja", pins = pins)