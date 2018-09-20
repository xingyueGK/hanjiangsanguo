# -*- coding:utf-8 -*-

from . import admin
from flask import render_template, redirect, url_for, flash, current_app
from app.admin.forms import userForm, fileForm,addfileForm

from werkzeug import secure_filename

import threading
from huodong.activ import activity, userinfo
from huodong.userfile import userList
import json, os
import redis

pool = redis.ConnectionPool(host='localhost', port=6379, db=0)
_redis = redis.StrictRedis(connection_pool=pool)


class MyThread(threading.Thread):
    def __init__(self, func, args=()):
        super(MyThread, self).__init__()
        self.func = func
        self.arg = args

    def run(self):
        self.result = self.func(*self.arg)

    def get_result(self):
        return self.result



# @admin.route('/', methods=["GET", "POST"])
# def index():  #
#     form = fileForm()
#     editorform = addfileForm()
#     if form.validate_on_submit():
#         userpath = current_app.config['userpath']
#         # 获取上传文件的文件名;
#         filename = secure_filename(form.file.data.filename)
#         # 将上传的文件保存到服务器;
#         form.file.data.save(os.path.join(userpath, filename))
#         flash("上传成功", 'ok')
#         return redirect(url_for('admin.index'))
#     user = userList()
#     return render_template("admin/index.html", **locals())

#添加账号
# @admin.route('add/',methods=["GET","POST"])
# def add():
#     form = fileForm()
#     editorform = addfileForm()
#     if editorform.validate_on_submit():
#         userpath = current_app.config['userpath']
#         # 获取上传文件的文件名;
#         filename = secure_filename(editorform.name.data)
#         # 将上传的数据保存到服务器;
#         with open(os.path.join(userpath, filename),'w') as f:
#             f.write(editorform.text.data)
#         flash("添加账号成功", 'ok')
#         return redirect(url_for('admin.index'))
#     user = userList()
#     #返回给前端错误提示信息
#     return render_template("admin/index.html", **locals())

# @admin.route('delete/<filename>')
# def delete(filename):
#     userpath = current_app.config['userpath']
#     os.remove(os.path.join(userpath, filename))
#     return redirect(url_for("admin.index"))
#
#
# @admin.route('/editor')
# def editor():
#     return render_template("admin/editors.html")


# @admin.route('/modifyUserInfo/<filename>', methods=['GET', 'POST'])
# def modifyUserInfo(filename):
#     userpath = current_app.config['userpath']
#     userform = userForm()
#     if userform.validate_on_submit():
#         file = os.path.join(userpath, filename)
#         with open(file, 'w') as f:
#             f.write(userform.text.data)
#         return redirect(url_for('admin.index'))
#     file = filename
#     fo = open(os.path.join(userpath, filename), "r")
#     content = fo.read()
#     fo.close()
#     return render_template('admin/editors.html', **locals())


@admin.route('/userinfo/<filename>', methods=['GET'])
def index(filename):
    thread = []
    result = []
    with open('users/{filename}'.format(filename=filename), 'r') as f:
        for i in f:
            if i.strip():
                name = i.split()[0]
                passwd = i.split()[1]
                try:
                    addr = i.split()[2]
                except:
                    addr = 149
                t1 = MyThread(userinfo, args=(name, passwd, addr))
                thread.append(t1)
    for t in thread:
        t.start()
    for t in thread:
        t.join()
        result.append(t.get_result())
    info = result
    user = userList()
    return render_template("admin/userinfo.html", **locals())


@admin.route('/data')
def alluserInfo():
    thread = []
    result = []
    with open('users/user.txt', 'r') as f:
        for i in f:
            if i.strip():
                name = i.split()[0]
                passwd = i.split()[1]
                try:
                    addr = i.split()[2]
                except:
                    addr = 149
                t1 = MyThread(userinfo, args=(name, passwd, addr))
                thread.append(t1)
    for t in thread:
        t.start()
    for t in thread:
        t.join()
        result.append(t.get_result())
    print result
    use = result
    return render_template("admin/data.html", info=use)


@admin.route('/<account>')
def userInfo(account):
    with open('users/user.txt', 'r') as f:
        print f.readline()
        for i in f:
            if i.strip():
                name = i.split()[0]
                if name == account:
                    passwd = i.split()[1]
                    addr = i.split()[2]
                    action = activity(account, passwd, addr)
                    country = action.action(c='country', m='get_member_list')

                    print json.dumps(country)
                    if country['country']:
                        countryName = country['name']
                    else:
                        countryName = None
                    print countryName
                    return 'country', countryName

def get_page(total,p):
    show_page = 5   # 显示的页码数
    pageoffset = 2  # 偏移量
    start = 1    #分页条开始
    end = total  #分页条结束
    if total > show_page:
        if p > pageoffset:
            start = p - pageoffset
            if total > p + pageoffset:
                end = p + pageoffset
            else:
                end = total
        else:
            start = 1
            if total > show_page:
                end = show_page
            else:
                end = total
        if p + pageoffset > total:
            start = start - (p + pageoffset - end)
    #用于模版中循环
    dic = range(start, end + 1)
    return dic

#国家列表，指定账号显示国家列表
@admin.route('country/<int:id>',methods=['GET','POST'])
def country(id=1):
    with open('users/149dgj.txt', 'r') as f:
        users = f.readline()
        if users.strip():
            name = users.split()[0]
            passwd = users.split()[1]
            try:
                addr = users.split()[2]
            except:
                addr = 149
            action = activity(name, passwd, addr)
            country = action.action(c='country', m='get_member_list')
            info = action.action(c='country', m='get_rank', page=id)
            p = id  # 页数
            show_shouye_status = 0  # 显示首页状态
            if p == '':
                p = 1
            else:
                p = int(p)
                if p > 1:
                    show_shouye_status = 1
            limit_start = (int(p) - 1) * 10  # 起始
            total = info['pages']-1 # 总页数
            dic = get_page(total, p)
            datas = {
                'p': int(p),
                'total': total,
                'show_shouye_status': show_shouye_status,
                'dic_list': dic

            }
    return render_template('admin/country.html',**locals())
#加入指定国家
@admin.route('country_join/<uid>')
def joincountryj(uid=None):
    with open('users/149dgj.txt', 'r') as f:
        return uid

@admin.route('conuntrydonate/')
def conuntrydonate():
    return


@admin.route('/action')
def action():
    pass
# 所有任务
