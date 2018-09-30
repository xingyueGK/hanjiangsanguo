#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2018/9/21 15:19
# @Author  : xingyue
# @File    : mult.py

import threading
import os,redis

project_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
userpath = os.path.join(os.path.dirname(project_dir), 'users')

pool = redis.ConnectionPool(host='localhost', port=6379, db=0)
_redis = redis.StrictRedis(connection_pool=pool)

class MyThread(threading.Thread):
    def __init__(self, func, args=()):
        super(MyThread, self).__init__()
        self.func = func
        self.arg = args
    def run(self):
        try:
            self.result = self.func(*self.arg)
        except:
            self.result = [self.arg]
    def get_result(self):
        return self.result
def main(func,filename,*args,**kwargs):
    thread = []
    result = []
    file = os.path.join(userpath,filename)
    with open(file,'r') as f:
        for i in f:
            if i.strip():
                print i.split()
                name = i.split()[0]
                passwd = i.split()[1]
                try:
                    addr = i.split()[2]
                except:
                    addr = 149
                t1 = MyThread(func, args=(name, passwd, addr,args,kwargs))
                thread.append(t1)
    for t in thread:
        t.start()
    for t in thread:
        t.join()
        result.append(t.get_result())
    return result