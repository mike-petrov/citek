from flask import Flask
from flask_cors import CORS

# from sets import SERVER, CLIENT

#

app = Flask(__name__)
app.config.from_object('config')
CORS(app, resources={r'/*': {'origins': '*'}})

from app import api