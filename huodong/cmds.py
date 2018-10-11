#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2018/9/28 17:38
# @Author  : xingyue
# @File    : cmds.py
import os
from tools.mult import main
from activity.activ import  *

#后台执行命令

def cmds(func,filename,*args,**kwargs):
    parm = ''
    for k,v in kwargs.items():
        parm += '-{k} {v} '.format(k=k,v=v)
    cmd = "python run.py  {filename} {func} a {parm}" .format(func=func,filename=filename,parm=parm)
    print cmd
    os.system(cmd)

cmds('dajie','fe')