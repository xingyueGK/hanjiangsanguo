# -*- coding:utf-8 -*-
from flask_wtf import FlaskForm
from huodong.tools.userfile import userList
from wtforms import BooleanField,StringField, TextAreaField, SubmitField, FileField, RadioField,IntegerField,SelectField,SubmitField

from wtforms.validators import  InputRequired, Regexp, ValidationError,DataRequired
from wtforms.widgets import Input

class ButtonInput(Input):
    """
    用于显示 input type='button' 式按钮的部件(widget)
    """
    input_type = 'button'

    def __call__(self, field, **kwargs):
        kwargs.setdefault('value', field.label.text)
        return super(ButtonInput, self).__call__(field, **kwargs)


class ButtonInputField(BooleanField):
    '''
    input type='button'式按钮
    '''
    widget = ButtonInput()


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
        default='True',
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
            "class": "btn btn-primary",
            # "id": "roboversea",
            # "onclick" : "login()",
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
class LoginForm(FlaskForm):
    """Accepts a nickname and a room."""
    name = StringField('Name', validators=[DataRequired()])
    room = StringField('Room', validators=[DataRequired()])
    submit = SubmitField('Enter Chatroom')