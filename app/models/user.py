from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    full_name = db.Column(db.String(100), nullable=False)
    hashed_password = db.Column(db.String(256), nullable=False)
    email = db.Column(db.String(256), nullable=False, unique=True)
    profile_image = db.Column(db.String(256))
    birthday = db.Column(db.Date, nullable=False)
    about_me = db.Column(db.String(500), nullable=False)

    giftlists_rel = db.relationship('Giftlist', back_populates='giftlist_user_id_rel', lazy='dynamic')

    requester_rel = db.relationship('Friend', backref='requesterId', lazy='dynamic', foreign_keys='Friend.requester')
    accepter_rel = db.relationship('Friend', backref='accepterId', lazy='dynamic', foreign_keys='Friend.accepter')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'full_name': self.full_name,
            'email': self.email,
            'profile_image': self.profile_image,
            'birthday': self.birthday,
            'about_me': self.about_me,
            'giftlists_rel': [giftlist.to_dict() for giftlist in self.giftlists_rel]
        }

    def to_dict_edit(self):
        return {
            'username': self.username,
            'full_name': self.full_name,
            'email': self.email,
            'profile_image': self.profile_image,
            'about_me': self.about_me
        }

    def to_dict_getfriends(self):

        pendingfriendrequest = self.requester_rel.all()
        friends = self.requester_rel.all()
        incomingfriendrequests = self.accepter_rel.all()

        returned = {'pendingfriends':{}, 'incomingfriends':{} }

        for i in pendingfriendrequest:
            returned['pendingfriends'][i.id]={
                'requester_id': i.requester,
                'accepter_id': i.accepter,
                'status': i.status
            }

        for i in friends:
            returned['incomingfriends'][i.id]={
                'requester_id': i.requester,
                'accepter_id': i.accepter,
                'status': i.status
            }

        for i in incomingfriendrequests:
            returned['incomingfriends'][i.id]={
                'requester_id': i.requester,
                'accepter_id': i.accepter,
                'status': i.status
            }

        return returned
