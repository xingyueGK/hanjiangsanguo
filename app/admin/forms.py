# -*- coding:utf-8 -*-
from flask_wtf import FlaskForm
from huodong.tools.userfile import userList
from wtforms import StringField, TextAreaField, SubmitField, FileField, RadioField,IntegerField,SelectField

from wtforms.validators import DataRequired, InputRequired, Regexp, ValidationError,DataRequired

class userForm(FlaskForm):
    text = TextAreaField(
        render_kw={
            "rows": "20",
            "cols": "130"
        }
    )
    commit = SubmitField(
        label='保存',
        render_kw={
            "class": "btn btn-primary"
        }
    )


class countryDoneForm(FlaskForm):
    language = RadioField(
        u'是否批量贡献',
        choices=[("Flase", '否'), ("True",'是'),],
        default='Flase',
        validators=[DataRequired(message='没有输入')]
    )
    destroy = RadioField(
        u'贡献完成后退出国家',
        choices=[("Flase", '否'), ("True",'是'),],
        default='Flase',
        validators=[DataRequired(message='没有输入')]
    )

    commit = SubmitField(
        label='贡献',
        render_kw={
            "class": "btn btn-primary"
        }
    )

class overseaForm(FlaskForm):

    country = StringField(
        label = u'需要打劫的国家',
        validators=[DataRequired(message='没有输入')],
        render_kw = {
            "class": "form-control",
            "id": "inputName",
            "placeholder": "国家1   国家2 （需要打劫的国家 ）",
        }
    )
    commit = SubmitField(
        label='开始打劫',
        render_kw={
            "class": "btn btn-primary"
        }
    )
class refreshOverseaForm(FlaskForm):
    user = userList()
    account = SelectField(
        label = u'选择刷船账号',
        choices = [(item[0],item[0]) for item in user ],
        validators=[DataRequired(message='没有输入')],
        render_kw = {
            "class":"form-control",
            "id":"inputWarning",
            "placeholder": "账号.txt",
        }
    )
    area = IntegerField(
        label=u'大区',
        default=149,
        validators=[DataRequired(message='输入数字')],
        render_kw={
            "class": "form-control",
            "id": "inputName",
            "placeholder": "大区",
        }
    )
    overseatype = RadioField(
        u'是否刷金色以上',
        choices=[("Flase", '否'), ("True",'是'),],
        default='True',
        validators=[DataRequired(message='没有输入')],
    )
    numbers = IntegerField(
        label=u'每次刷船次数',
        default = 20,
        validators=[DataRequired(message='输入数字')],
        render_kw={
            "class": "form-control",
            "id": "inputName",
        }
    )
    commit = SubmitField(
        label='开始刷船',
        render_kw={
            "class": "btn btn-primary"
        }
    )
