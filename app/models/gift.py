from .db import db
from sqlalchemy.schema import ForeignKey


class Gift(db.Model):
    __tablename__ = 'gifts'

    id = db.Column(db.Integer, primary_key=True)
    list_id = db.Column(db.Integer, ForeignKey('giftlists.id'), nullable=False)
    gift_name = db.Column(db.String(100), nullable=False)
    gift_description = db.Column(db.String(256), nullable=False)
    gift_link = db.Column(db.String(256))
    purchased = db.Column(db.Boolean, default=False, nullable=False)
