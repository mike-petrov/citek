from flask import request, jsonify
from app import app
import pymongo
from pymongo import MongoClient
import json

cluster = MongoClient("mongodb+srv://Leonid:Factor_9@cluster0-e2dix.mongodb.net/test?retryWrites=true&w=majority")
db = cluster['test']
projects = db['projects']
users = db['users']

@app.route('/projects', methods=['POST'])
def post():
	results = projects.find({})
	ans = []
	for result in results:
		t = result['_id']
		del result['_id']
		result['id'] = int(t)
		ans.append(result)
	return json.dumps(ans)

@app.route('/project/like', methods=['POST'])
def update():
	x = request.json
	projectId = x['id']
	flag = x['type']
	if flag:
		p = projects.find_one({'_id': projectId})
		
		like = p['countLikes']
		projects.update_one({'_id': projectId}, {'$set':{ 'countLikes': like + 1}})
	else:
		p = projects.find_one({'_id': projectId})
		like = p['countDislikes']
		projects.update_one({'_id': projectId}, {'$set':{ 'countDislikes': like - 1}})

	ans = []
	results = projects.find({})
	for result in results:
		t = result['_id']
		del result['_id']
		result['id'] = int(t)
		ans.append(result)
	return json.dumps(ans)

@app.route('/project', methods=['POST'])
def viewproject():
	x = request.json
	res = projects.find_one({'_id': x['id']})
	t = res['_id']
	del res['_id']
	return json.dumps(res)

@app.route('/auth', methods=['POST'])
def authorization():
	x = request.json
	login = x['login']
	password = x['password']

	if projects.find({'login': login}).limit(1).size() != 1:
		return json.dumps({'error': 'login'})

	person = projects.find({'login': login})
	if person['password'] != password:
		return json.dumps({'error': 'password'})
	else:
		return json.dumps(person)

@app.route('/reg', methods=['POST'])
def registration():
	x = request.json
	login = x['login']
	password = x['password']
	name = x['name']
	email = x['email']
	status = x['status']

	if users.find({'email': email}).limit(1).size() != 1:
		return json.dumps({'error': 'email'})

	post = {'_id': len(users),'login': login, 'password': password, 'name': name, 'email': email, 'status': status}

	users.update_one(post)

	return json.dumps(post)
