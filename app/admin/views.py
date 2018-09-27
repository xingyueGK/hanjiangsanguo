# -*- coding:utf-8 -*-

from . import admin
from flask import render_template, redirect, url_for, flash, current_app,request,abort,session

from forms import countryDoneForm
from functools import  wraps
from ast import literal_eval
from huodong.task.base import  SaoDangFb
from huodong.tools.mult import  main
from huodong.userinfo.userinfo import  userinfo
from huodong.tools.userfile import userList
import json,os
import redis

pool = redis.ConnectionPool(host='localhost', port=6379, db=0)
_redis = redis.StrictRedis(connection_pool=pool)

class BaseFactory(object):
    def __init__(self):
        self.filename = session['filename']
        self.userpath = current_app.config['userpath']
        self.user = os.path.join(self.userpath,self.filename)
#必须有账号
def valades(func):
    @wraps(func)
    def validatorFile(*args,**kwargs):
        arg = session['filename']
        if not arg:
            abort(404)
        rest = func(*args, **kwargs)
        return rest
    return validatorFile


@admin.route('/')
def index():
    filename = request.args.get('filename')
    if filename:
        session['filename'] = filename
    else:
        abort(404,"账号不存在,指定账号后重试")
    if _redis.exists(filename):
        info = _redis.lrange(filename,0,_redis.llen(filename))
        info = literal_eval(info[0])
    else:
        info = main(filename,userinfo)
        _redis.lpush(filename,info)
        _redis.expire(filename,3600)
    user = userList()
    return render_template("admin/userinfo.html", **locals())

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
@valades
def country(id=1):
    filename = session['filename']
    userpath = current_app.config['userpath']
    user = os.path.join(userpath,filename)
    with open(user,'r') as f:
        context = f.readline()
        name = context.split()[0]
        passwd = context.split()[1]
        addr = context.split()[2]
        action = SaoDangFb(name, passwd, addr)
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
    filename = session['filename']
    userpath = current_app.config['userpath']
    user = os.path.join(userpath,filename)
    with open(user,'r') as f:
        return uid

@admin.route('conuntrydonate/',methods=['GET','POST'])
def conuntrydonate():

    form = countryDoneForm()
    if form.validate_on_submit():
        flag = form.language.data
        if flag == 'Flase':
            print 'jifaef'
        elif flag == 'True':
            print 'rfje'
    print form.language.errors
    return render_template('admin/conuntrydonate.html',**locals())


@admin.route('/action')
def action():
    pass
# 所有任务

@admin.route('log')
def log():
    return render_template('admin/log.html',**locals())
