from flask import request, jsonify
from app import app


@app.route('/', methods=['POST'])
def post():
	x = request.json
	print(x)

	return jsonify(x)
