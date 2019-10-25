from flask import request, jsonify
from app import app
import pymongo
from pymongo import MongoClient
import json

cluster = MongoClient("mongodb+srv://Leonid:Factor_9@cluster0-e2dix.mongodb.net/test?retryWrites=true&w=majority")
db = cluster['test']
collection = db['projects']


@app.route('/projects', methods=['POST'])
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

@app.route('/project/<projectId>/like/<flag>', methods=['POST'])
def update(projectId, flag):
	if flag:
		p = collection.find_one({'_id': projectId})
		print(projectId)
		like = p['countLikes']
		collection.update_one({'_id': projectId}, {'$set':{ 'countLikes': like + 1}})
	else:
		p = collection.find_one({'_id': projectId})
		like = p['countDislikes']
		collection.update_one({'_id': projectId}, {'$set':{ 'countDislikes': like - 1}})

	ans = []
	results = collection.find({})
	for result in results:
		t = result['_id']
		del result['_id']
		result['id'] = int(t)
		ans.append(result)
	return json.dumps(ans)

@app.route('/project/<projectId>', methods=['POST'])
def viewproject(projectId):
	res = collection.find_one({'_id': projectId})
	t = res['_id']
	del res['_id']
	return json.dumps(res)
