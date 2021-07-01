from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Giftlist

user_routes = Blueprint('lists', __name__)


@giftlist_routes.route('/', methods=['POST'])
def post_list():
    lists = lists.
