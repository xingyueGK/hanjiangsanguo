# -*- coding:utf-8 -*-
from flask_wtf import FlaskForm
from flask_wtf.file import FileRequired, FileAllowed
from wtforms import StringField, TextAreaField, SubmitField, FileField, RadioField

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

    commit = SubmitField(
        label='贡献',
        render_kw={
            "class": "btn btn-primary"
        }
    )