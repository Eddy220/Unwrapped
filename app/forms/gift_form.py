from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired
from app.models import User


class GiftForm(FlaskForm):
    gift_name = StringField('gift_name', validators=[DataRequired()])
    gift_description = StringField('gift_description', validators=[DataRequired()])
    gift_link = StringField('gift_link')
