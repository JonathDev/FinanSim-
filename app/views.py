from flask import render_template, request, jsonify, make_response, redirect, url_for, Blueprint
import uuid
import os
import hashlib
import sys
import shutil


sessions={}


user_blueprint = Blueprint('user_blueprint', __name__)

def purge_cache():
    shutil.rmtree('cache')

@user_blueprint.route('/', methods=["GET"])
def root():
    response = make_response(redirect('/index'))
    #uid=str(uuid.uuid4())
    #response.set_cookie("session", uid, max_age=86400)
    #sessions[uid]={}
    return response

@user_blueprint.route('/index', methods=["GET"])
def index():
    return render_template('index.html',url=url_for('user_blueprint.root'))

@user_blueprint.route('/dates', methods=["GET"])
def dates():
    return render_template('dates.html',url=url_for('user_blueprint.root'))

@user_blueprint.route('/credit', methods=["GET"])
def credit():
    return render_template('credit.html',url=url_for('user_blueprint.root'))
