from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired
from app.models import User


class GiftListForm(FlaskForm):
    list_name = StringField('list_name', validators=[DataRequired()])
