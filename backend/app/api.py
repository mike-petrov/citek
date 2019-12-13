from flask import request, jsonify
from app import app
import pymongo
from pymongo import MongoClient
import json
import requests
import time


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

@app.route('/projects/filter', methods=['POST'])
def filter():
	x = request.json

	timestamp = x['timestamp']
	type = x['type']

	if type == 'last':
		results = projects.find({ 'date': {'$lt': timestamp}},{'_id': False})
	elif type == 'current':
		results = projects.find({ '$and' : [{'date' : {'$gt': timestamp[0]}},{'date': {'$lt': timestamp[1]}}] },{'_id': False})
	else:
		results = projects.find({ 'date': {'$gt': timestamp}},{ '_id': False})
	ans = []
	for result in results:
		ans.append(result)
	return json.dumps(ans)

@app.route('/project/like', methods=['POST'])
def update():
	x = request.json

	projectId = x['id']
	userMail = x['user_mail']

	flag = x['type']
	if flag:
		projects.update_one({'_id': projectId}, {'$push':{ 'likes': userMail }})
		users.update_one({'mail': userMail}, {'$push':{ 'likes': projectId }})
		projects.update_one({'_id': projectId}, {'$pull':{ 'dislikes': userMail }})
		users.update_one({'mail': userMail}, {'$pull':{ 'dislikes': projectId }})
	else:
		users.update_one({'mail': userMail}, {'$push':{ 'dislikes': projectId }})
		projects.update_one({'_id': projectId}, {'$push':{ 'dislikes': userMail }})
		projects.update_one({'_id': projectId}, {'$pull':{ 'likes': userMail }})
		users.update_one({'mail': userMail}, {'$pull':{ 'likes': projectId }})

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

	git = res['linkGit']
	owner_git = git.split('/')[3]
	project_git = git.split('/')[4]

	main_link_git = 'https://api.github.com/repos/' + owner_git + '/' + project_git
	open_issues = requests.get(main_link_git + '/issues?state=open', auth=('mike-petrov', 'dbc9ed55153fb49e72ef05d36f37c341a06a9ee4')).json()
	closed_issues = requests.get(main_link_git + '/issues?state=closed', auth=('mike-petrov', 'dbc9ed55153fb49e72ef05d36f37c341a06a9ee4')).json()

	data_git = {
		'issues': {
			'open': len(open_issues),
			'closed': len(closed_issues)
		},
		'statistics': {
			'branches': len(requests.get(main_link_git + '/branches', auth=('mike-petrov', 'dbc9ed55153fb49e72ef05d36f37c341a06a9ee4')).json()),
			'assignees': len(requests.get(main_link_git + '/assignees', auth=('mike-petrov', 'dbc9ed55153fb49e72ef05d36f37c341a06a9ee4')).json()),
			'labels': len(requests.get(main_link_git + '/labels', auth=('mike-petrov', 'dbc9ed55153fb49e72ef05d36f37c341a06a9ee4')).json()),
			'milestones': len(requests.get(main_link_git + '/milestones', auth=('mike-petrov', 'dbc9ed55153fb49e72ef05d36f37c341a06a9ee4')).json()),
			'releases': len(requests.get(main_link_git + '/releases', auth=('mike-petrov', 'dbc9ed55153fb49e72ef05d36f37c341a06a9ee4')).json()),
			'downloads': len(requests.get(main_link_git + '/downloads', auth=('mike-petrov', 'dbc9ed55153fb49e72ef05d36f37c341a06a9ee4')).json()),
		},
		'languages': requests.get(main_link_git + '/languages', auth=('mike-petrov', 'dbc9ed55153fb49e72ef05d36f37c341a06a9ee4')).json()
	}
	res['github'] = data_git

	return json.dumps(res)

@app.route('/auth', methods=['POST'])
def authorization():
	x = request.json
	login = x['login']
	password = x['password']
	person = users.find_one({'login': login})

	if not person:
		return json.dumps({'error': 'login'})

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
	mail = x['mail']
	status = x['status']

	if users.find_one({'mail': mail}):
		return json.dumps({'error': 'mail'})

	post = {'_id': users.count() + 1, 'login': login, 'password': password, 'name': name, 'mail': mail, 'status': status, 'likes': [], 'dislikes': []}

	users.insert_one(post)

	return json.dumps(post)

@app.route('/project/create', methods=['POST'])
def create_project():
	x = request.json

	name = x['name']
	description = x['description']
	category = x['category']
	status = x['status']
	linkGit = x['linkGit']

	post = {
		'_id': projects.count() + 2,
		'name': name,
		'description': description,
		'category': category,
 		'status': status,
		'likes': [],
		'dislikes': [],
		'linkGit': linkGit,
		'date': int(time.time()),
	}

	projects.insert_one(post)

	return post
