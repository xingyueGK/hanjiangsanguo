#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2018/9/28 17:38
# @Author  : xingyue
#命令入口文件，后面所有新加模块通过此命令行调用

from tools.mult import main
from activity.activ import  dajie as rob
import os
#当前文件路径
import click



@click.group()
@click.argument('file')
@click.pass_context
def hjsg(ctx,file):
    """接受函数"""
    ctx.obj['file'] = file


@hjsg.command()
@click.argument('countrylist',nargs = -1)
@click.pass_context
def dajie(ctx,countrylist):
    file = ctx.obj['file']
    main(rob,file,countrylist)


if __name__ == "__main__":
    hjsg(obj={})