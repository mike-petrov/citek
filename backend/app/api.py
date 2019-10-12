from flask import request, jsonify
from app import app
import pymongo
from pymongo import MongoClient
import json

cluster = MongoClient("mongodb+srv://Leonid:Factor_9@cluster0-e2dix.mongodb.net/test?retryWrites=true&w=majority")
db = cluster['test']
collection = db['projects']


@app.route('/', methods=['POST'])
def post():
	#x = request.json
	results = collection.find({})
	ans = []
	for result in results:
		del result['_id']
		ans.append(result)
	print("hiiii", results)
	print(json.dumps(ans))
	return json.dumps(ans)
