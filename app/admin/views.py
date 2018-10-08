# -*- coding:utf-8 -*-

from . import admin
from flask import render_template, redirect, url_for, flash, current_app,request,abort,session

from forms import countryDoneForm,overseaForm,refreshOverseaForm
from functools import  wraps
from ast import literal_eval
from huodong.task.base import  SaoDangFb
from huodong.tools.mult import  main
from huodong.cmds import  cmds
from huodong.userinfo.userinfo import  userinfo
from huodong.tools.userfile import userList
from huodong.activity.activ import *
import json,os
import redis

from .. import socketio

pool = redis.ConnectionPool(host='localhost', port=6379, db=0)
_redis = redis.StrictRedis(connection_pool=pool)

def valades(func):
    @wraps(func)
    def validatorFile(*args,**kwargs):
        try:
            arg = session['filename']
            if not arg:
                abort(404, "账号不存在,指定账号后重试")
            rest = func(*args, **kwargs)
            return rest
        except KeyError as e:
            abort(404, "账号不存在,指定账号后重试")
    return validatorFile


class BaseFactory(object):
    @valades
    def __init__(self):
        self.filename = session['filename']
        self.userpath = current_app.config['userpath']
        self.user = os.path.join(self.userpath,self.filename)
#必须有账号



@admin.route('/')
def index():
    filename = request.args.get('filename')
    if filename:
        session.permanent = True
        session['filename'] = filename
    else:
        abort(404,"账号不存在,指定账号后重试")
    if _redis.exists(filename):
        info = _redis.lrange(filename,0,_redis.llen(filename))
        info = literal_eval(info[0])
    else:
        info = main(userinfo,filename)
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
    user = BaseFactory().user
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
    user = BaseFactory().user
    with open(user,'r') as f:
        return uid

@admin.route('conuntrydonate/',methods=['GET','POST'])
def conuntrydonate():
    user = BaseFactory().user
    form = countryDoneForm()
    if form.validate_on_submit():
        flag = form.language.data
        if flag == 'Flase':
            print user
        elif flag == 'True':
            print 'rfje'
    print form.language.errors
    return render_template('admin/conuntrydonate.html',**locals())


@admin.route('/action')
def action():
    pass
# 所有任务

#节日海运打劫
@admin.route('oversea/rob',methods=['GET','POST'])
#@valades
def rob():
    b = BaseFactory()
    user = b.user
    form = overseaForm()
    reform = refreshOverseaForm()
    if form.validate_on_submit():
        print form.validate_on_submit()
        country_list = form.country.data.split()
        print country_list
        # for i in range(20):
        #     socketio.emit('message', {'msg':country_list}, namespace='/chat')
        #     time.sleep(0.2)
        main(dajie,b.filename,country_list)
        # return render_template('admin/oversea.html', **locals())
    return render_template('admin/oversea.html',**locals())

@admin.route('oversea/refresh',methods=['GET','POST'])
def refresh():
    form = overseaForm()
    reform = refreshOverseaForm()
    if reform.validate_on_submit():
        account = reform.account.data
        area = reform.area.data
        numbers = reform.numbers.data
        flag =  True and reform.overseatype.data.lower() == 'true' or False
        # threading.Thread(target=main,args=(userinfo,account),kwargs={"area":area,"numbers":numbers,"flag":flag}).start()
        # threading.Thread(target=sendMsg).start()
        return render_template('admin/oversea.html', **locals())
    return render_template('admin/oversea.html',**locals())


@admin.route('logs/<type>')
def logs(type):
    form = overseaForm()
    reform = refreshOverseaForm()
    threading.Thread(target=sendMsg).start()
    return render_template("admin/sockio.html",**locals())


def sendMsg():
    name = 'roboversea'
    room = 'ceshiRome'
    ps = _redis.pubsub()
    ps.subscribe(name)  # 从liao订阅消息
    for item in ps.listen():  # 监听状态：有消息发布了就拿过来
        if item['type'] == 'message':
            msg= item['data']
            socketio.emit('message', {'msg': msg}, namespace='/chat')