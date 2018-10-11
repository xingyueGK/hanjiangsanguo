#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2018/9/28 17:38
# @Author  : xingyue
#命令入口文件，后面所有新加模块通过此命令行调用

#from huodong.task.base import SaoDangFb
import os
#当前文件路径
curpath = os.path.dirname(os.path.abspath(__file__))
import click

class userAbsPathFile(object):
    def __init__(self,name=None):
        self.name = os.path.join(curpath,name)


@click.group()
@click.argument('file')
@click.pass_context
def hjsg(ctx,file):
    """接受函数"""
    ctx.obj['file'] = os.path.join(curpath,file)


@hjsg.command()
@click.argument('src')
@click.pass_context
def dajie(ctx,src):
    print ctx.obj['file'],src


if __name__ == "__main__":
    hjsg(obj={})