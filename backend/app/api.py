from flask import request, jsonify
from app import app
import pymongo
from pymongo import MongoClient
import json

cluster = MongoClient("mongodb+srv://Leonid:Factor_9@cluster0-e2dix.mongodb.net/test?retryWrites=true&w=majority")
db = cluster['test']
collection = db['projects']


@app.route('/cards', methods=['POST'])
def post():
	#x = request.json
	results = collection.find({})
	ans = []
	for result in results:
		t = result['_id']
		del result['_id']
		result['id'] = int(t)
		ans.append(result)
	return json.dumps(ans)

@app.route('/card/<cardId>/like/<flag>', methods=['POST'])
def update(cardId, flag):
	if flag:
		p = collection.find_one({'_id': cardId})
		print(cardId)
		like = p['countLikes']
		collection.update_one({'_id': cardId}, {'$set':{ 'countLikes': like + 1}})
	else:
		p = collection.find_one({'_id': cardId})
		like = p['countLikes']
		collection.update_one({'_id': cardId}, {'$set':{ 'countDislikes': like - 1}})

	results = collection.find({})
	for result in results:
		t = result['_id']
		del result['_id']
		result['id'] = int(t)
		ans.append(result)
	return json.dumps(ans)
