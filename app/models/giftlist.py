from .db import db
from sqlalchemy.schema import ForeignKey

class Giftlist(db.Model):
    __tablename__ = 'giftlists'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey('users.id'), nullable=False)
    list_name = db.Column(db.String(50), nullable=False)

    giftlist_user_id_rel = db.relationship('Gift', backref='giftlist_userId', lazy='dynamic', foreign_keys='Gift.list_id')
