#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2018/10/9 17:56
# @Author  : xingyue

from setuptools import setup

setup(
    name='run',
    version='0.1',
    py_modules=['hjsg'],
    install_requires=[
        'Click',
    ],
    entry_points='''
        [console_scripts]
        run=huodong.run:hjsg
    ''',
)