#-*- coding:utf-8- -*-

from flask import Blueprint

base = Blueprint("base",__name__)

from app.base import views

