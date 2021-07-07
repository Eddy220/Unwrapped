from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, db, Friend
from app.forms import EditUserForm

user_routes = Blueprint('users', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages

@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/<int:id>', methods=['PATCH'])
@login_required
def edit_user(id):
    form = EditUserForm()
    form['csrf_token'].data=request.cookies['csrf_token']

    if form.validate_on_submit():
        user = User.query.filter(User.id == current_user.id).first()
        # user = current_user
        print(user, 'hey this is user!!')
        print(user.username)
        user_username = form.data['username']
        user_full_name = form.data['full_name']
        user_email = form.data['email']
        user_profile_image = form.data['profile_image']
        user_about_me = form.data['about_me']

        user.username = user_username
        user.full_name = user_full_name
        user.email = user_email
        user.profile_image = user_profile_image
        user.about_me = user_about_me
        db.session.commit()
        return user.to_dict_edit()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401



@user_routes.route('/search/<int:id>')
@login_required
def search_user(id):
    user = User.query.get(id)
    # print(user.__dict__, 'this is user')
    print(user.requester_rel)
    print(user.accepter_rel)
    return user.to_dict()


@user_routes.route('/request/<int:id>')
@login_required
def request_id(id):
    user_id = current_user.id
    friend = Friend(requester=user_id, accepter=id)
    db.session.add(friend)
    db.session.commit()
    user = User.query.get(user_id)
    print(user.requester_rel.first().__dict__)
    return
