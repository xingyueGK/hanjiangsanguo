#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2018/9/30 14:02
# @Author  : xingyue
# @File    : events.py

from flask import session
from flask_socketio import emit, join_room, leave_room
from app import socketio