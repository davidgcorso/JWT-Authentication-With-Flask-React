from flask import Blueprint, request, jsonify
from api.models import User
from flask_jwt_extended import create_access_token, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
import datetime

bpAuth = Blueprint('bpAuth', __name__)

@bpAuth.route('/login', methods=['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')
    
    user = User.query.filter_by(email=username).first()

    if not user: return jsonify({'status':'fail', 'message': 'username/password incorrect!'}), 401
    if not check_password_hash(user.password, password): return jsonify({'status':'fail', 'message': 'username/password incorrect!'}), 401

    expires = datetime.timedelta(minutes=10)
    access_token = create_access_token(identity=user.id, expires_delta=expires)

    data = {
        "status": "success",
        "message": "login succesfully",
        "acces_token": access_token,
        "user": user.serialize()
    }

    return jsonify(data), 200

@bpAuth.route('/register', methods=['POST'])
def register():
    username = request.json.get('username')
    password = request.json.get('password')
    is_active = request.json.get('is_active')

    user = User()
    user.email = username
    user.password = generate_password_hash(password)
    user.is_active = is_active
    user.save()

    return jsonify ({'status':'success', 'message': 'succesfully!'}), 200