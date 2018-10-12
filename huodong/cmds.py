#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2018/9/28 17:38
# @Author  : xingyue
# @File    : cmds.py

from activity.activ import  *
import os

#后台执行命令

def cmds(func,filename,*args):
    lengths =  len(args)
    arg = ''
    for a in args:
        arg = arg + " " + a
    cmd = "python run.py  {filename} {func}  {arg} " .format(func=func,filename=filename,arg=arg)
    print cmd
    rest = os.popen(cmd)
    return rest

