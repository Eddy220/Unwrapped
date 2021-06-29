from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    full_name = db.Column(db.String(40), nullable=False)
    hashed_password = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(256), nullable=False, unique=True)
    profile_image = db.Column(db.String(256))
    birthday = db.Column(db.Date())
    about_me = db.Column(db.String(500), nullable=False)

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
            'about_me': self.about_me
        }
