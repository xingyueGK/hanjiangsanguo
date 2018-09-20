#-*- coding:utf-8 -*-
from . import base

from flask import render_template, redirect, url_for, flash, current_app
from app.base.forms import userForm, fileForm,addfileForm

from werkzeug import secure_filename

from huodong.activ import activity, userinfo
from huodong.userfile import userList
import os
import redis

pool = redis.ConnectionPool(host='localhost', port=6379, db=0)
_redis = redis.StrictRedis(connection_pool=pool)


@base.route('/', methods=["GET", "POST"])
def index():  #
    form = fileForm()
    editorform = addfileForm()
    if form.validate_on_submit():
        userpath = current_app.config['userpath']
        # 获取上传文件的文件名;
        filename = secure_filename(form.file.data.filename)
        # 将上传的文件保存到服务器;
        form.file.data.save(os.path.join(userpath, filename))
        flash("上传成功", 'ok')
        return redirect(url_for('base.index'))
    user = userList()
    return render_template("index.html", **locals())
#添加账号
@base.route('/add/',methods=["GET","POST"])
def add():
    form = fileForm()
    editorform = addfileForm()
    if editorform.validate_on_submit():
        userpath = current_app.config['userpath']
        # 获取上传文件的文件名;
        filename = secure_filename(editorform.name.data)
        # 将上传的数据保存到服务器;
        with open(os.path.join(userpath, filename),'w') as f:
            f.write(editorform.text.data)
        flash("添加账号成功", 'ok')
        return redirect(url_for('base.index'))
    user = userList()
    #返回给前端错误提示信息
    return render_template("index.html", **locals())

@base.route('/editor')
def editor():
    return render_template("editors.html")


@base.route('/modifyUserInfo/<filename>', methods=['GET', 'POST'])
def modifyUserInfo(filename):
    userpath = current_app.config['userpath']
    userform = userForm()
    if userform.validate_on_submit():
        file = os.path.join(userpath, filename)
        with open(file, 'w') as f:
            f.write(userform.text.data)
        return redirect(url_for('base.index'))
    file = filename
    fo = open(os.path.join(userpath, filename), "r")
    content = fo.read()
    fo.close()
    return render_template('editors.html', **locals())

@base.route('/delete/<filename>')
def delete(filename):
    userpath = current_app.config['userpath']
    os.remove(os.path.join(userpath, filename))
    return redirect(url_for("base.index"))