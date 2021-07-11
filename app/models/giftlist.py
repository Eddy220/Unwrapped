from .db import db
from sqlalchemy.schema import ForeignKey

class Giftlist(db.Model):
    __tablename__ = 'giftlists'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey('users.id'), nullable=False)
    list_name = db.Column(db.String(50), nullable=False)

    giftlist_user_id_rel = db.relationship('User', back_populates='giftlists_rel')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'list_name': self.list_name
        }
