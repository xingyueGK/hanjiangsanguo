#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2018/9/28 17:38
# @Author  : xingyue
# @File    : cmds.py
import os
from tools.mult import main
from activity.activ import  *

curpath = os.path.dirname(os.path.abspath(__file__))

def cmds(func,filename,*args,**kwargs):
    parm = ''
    for k,v in kwargs.items():
        parm += '-{k} {v} '.format(k=k,v=v)
    cmd = "python {hjsg} -func {func} -filename {filename} {parm}" .format(hjsg=hjsg,func=func,filename=filename,parm=parm)
    os.system(cmd)

