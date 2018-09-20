#!/use/bin/env python
#-*- coding:utf-8 -*-

import os
from flask import Flask,render_template
from app.base import base as base_blueprint
from app.admin import admin as admin_blueprint

app = Flask(__name__)
app.debug = True
app.config['SECRET_KEY'] = '3595e80829804bcaa590c745aef87379'
app.config['userpath'] =  os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),'users')
app.register_blueprint(base_blueprint)
app.register_blueprint(admin_blueprint,url_prefix='/admin')

@app.errorhandler(404)
def page_not_found(e):
    return render_template('admin/404.html'), 404