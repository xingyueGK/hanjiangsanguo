#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2018/8/30 11:19
# @Author  : xingyue
# @File    : __init__.py

from flask import Blueprint

admin = Blueprint("admin",__name__)
admin.config = {}
from app.admin import views