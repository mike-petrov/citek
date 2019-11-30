from flask import request, jsonify
from app import app
import pymongo
from pymongo import MongoClient
import json
import requests

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
		projects.update_one({'_id': projectId}, {'$set':{ 'countDislikes': like + 1}})

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
	open_issues = requests.get(main_link_git + '/issues?state=open').json()
	closed_issues = requests.get(main_link_git + '/issues?state=closed').json()

	data_git = {
		'issues': {
			'open': len(open_issues),
			'closed': len(closed_issues)
		},
		'statistics': {
			'branches': len(requests.get(main_link_git + '/branches').json()),
			'assignees': len(requests.get(main_link_git + '/assignees').json()),
			'labels': len(requests.get(main_link_git + '/labels').json()),
			'milestones': len(requests.get(main_link_git + '/milestones').json()),
			'releases': len(requests.get(main_link_git + '/releases').json()),
			'downloads': len(requests.get(main_link_git + '/downloads').json()),
		},
		'languages': requests.get(main_link_git + '/languages').json()
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

	post = {'_id': users.count() + 1, 'login': login, 'password': password, 'name': name, 'mail': mail, 'status': status}

	users.insert_one(post)

	return json.dumps(post)

@app.route('/project/create', methods=['POST'])
def create_project():
	x = request.json

	name = x['name']
	description = x['description']
	category = x['category']
	status = x['status']
	countLikes = 0
	countDislikes = 0
	linkGit = x['linkGit']

	post = {
			'_id': projects.count() + 2,
			'name': name,
			'description': description,
			'category': category,
	 		'status': status,
			'countLikes': countLikes,
			'countDislikes': countDislikes,
			'linkGit': linkGit
			}

	projects.insert_one(post)

	return post
