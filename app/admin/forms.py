# -*- coding:utf-8 -*-
from flask_wtf import FlaskForm
from flask_wtf.file import FileRequired, FileAllowed
from wtforms import StringField, TextAreaField, SubmitField, FileField


from wtforms.validators import DataRequired,InputRequired,Regexp,ValidationError


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


class addfileForm(FlaskForm):
    text = TextAreaField(
        validators=[DataRequired(message=u'填写账号密码')],
        render_kw={
            "class":"form-control",
            "rows": "20",
            "placeholder":"账号 密码 大区"
        }
    )
    name = StringField(
        label='文件名',
        validators=[
            Regexp(r'^.*\.txt$', message=u"必须以.txt结尾"),
            InputRequired(message=u'必须命名为.txt,列如aa.txt')
        ],
        render_kw={
            "class": "form-control",
            "id": "inputName",
            "placeholder": "文件名",
        }
    )
    commit = SubmitField(
        label='保存',
        render_kw={
            "class": "btn btn-primary"
        }
    )



class fileForm(FlaskForm):
    file = FileField('上传文件', validators=[
        FileRequired('必上传文件txt'),
        # 指定文件上传的格式;
        FileAllowed(['txt'], '只接收.txt格式的')
    ]
                     )
    commit = SubmitField(
        label='上传',
        render_kw={
            "class": "btn btn-primary"
        }
    )
