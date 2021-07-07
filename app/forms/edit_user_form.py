from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired
from app.models import User


class EditUserForm(FlaskForm):
    username = StringField('username', validators=[DataRequired()])
    full_name = StringField('full_name', validators=[DataRequired()])
    email = StringField('email', validators=[DataRequired()])
    profile_image = StringField('profile_image')
    about_me = StringField('about_me', validators=[DataRequired()])
