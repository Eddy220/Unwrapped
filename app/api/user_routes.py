from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, db
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
