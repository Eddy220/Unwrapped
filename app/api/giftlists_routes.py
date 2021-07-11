from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Giftlist
from app.forms import GiftListForm

giftlists_routes = Blueprint('giftlists', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages

@giftlists_routes.route('/all/user')
def get_lists():
    user = current_user.id
    giftlists = Giftlist.query.filter(Giftlist.user_id == user).all()
    return {"giftlists":[giftlist.to_dict() for giftlist in giftlists] }

# @giftlists_routes.route('/all/user')
# def get_lists():
#     print()
#     giftlists = User.query.filter(User. == user).all()
#     return {"giftlists":[giftlist.to_dict() for giftlist in giftlists] }

# @giftlists_routes.route('/all/user')
# def get_lists():
#     giftlists = Giftlist.query.all()
#     return {"giftlists":[giftlist.to_dict() for giftlist in giftlists] }

# @giftlists_routes.route('/all/user/<int:id>')
# @login_required
# def get_all_lists(id):
#     giftlists = Giftlist.query.filter(Giftlist.user_id == id).all()
#     return {"giftlists":[giftlist.to_dict() for giftlist in giftlists] }

@giftlists_routes.route('/one/user/<int:id>')
def get_one(id):
    giftlist = Giftlist.query.filter_by(id=id).first()
    return giftlist.to_dict()

@giftlists_routes.route('/', methods=['POST'])
def post_list():
    form = GiftListForm()
    form['csrf_token'].data=request.cookies['csrf_token']

    if form.validate_on_submit():
        user = current_user.id
        form_list = form.list_name.data
        newList = Giftlist(user_id=user, list_name=form_list)
        db.session.add(newList)
        db.session.commit()
        return newList.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@giftlists_routes.route('/editlist/<int:id>', methods=['PATCH'])
def edit_list(id):
    form = GiftListForm()
    form['csrf_token'].data=request.cookies['csrf_token']

    if form.validate_on_submit():
        giftlist = Giftlist.query.filter_by(id=id).first()
        user = current_user.id
        list_name = form.data['list_name']

        giftlist.user_id = user
        giftlist.list_name = list_name
        db.session.commit()
        return giftlist.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@giftlists_routes.route('/deletelist/<int:id>', methods=['DELETE'])
def delete_list(id):
    user = current_user.id
    giftlist = Giftlist.query.filter(Giftlist.id == id).first()
    db.session.delete(giftlist)
    if giftlist.user_id != user:
        return {'errors': 'Only the owner of the list can delete.'}
    db.session.commit()
    return {'giftlist': id}
