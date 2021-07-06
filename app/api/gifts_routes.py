from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Gift, Giftlist
from app.forms import GiftForm

gifts_routes = Blueprint('gifts', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages


@gifts_routes.route('/<int:id>')
def get_gifts(id):
    gifts = Gift.query.filter(Gift.list_id==id).all()
    return {"gifts": [gift.to_dict() for gift in gifts]}


@gifts_routes.route('/<int:id>', methods=['POST'])
def post_gift(id):
    form = GiftForm()
    form['csrf_token'].data=request.cookies['csrf_token']

    if form.validate_on_submit():
        giftlist_id = Giftlist.query.filter_by(id=id).first()
        form_gift_name = form.gift_name.data
        form_gift_description = form.gift_description.data
        form_gift_link = form.gift_link.data

        newGift = Gift(
        list_id = giftlist_id.id,
        gift_name = form_gift_name,
        gift_description = form_gift_description,
        gift_link = form_gift_link,
        )

        db.session.add(newGift)
        db.session.commit()
        return newGift.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@gifts_routes.route('/<int:id>', methods=['DELETE'])
def delete_gift(id):
    deleteGift = Gift.query.filter(Gift.id==id).first()
    db.session.delete(deleteGift)
    db.session.commit()
    return {'id': id}


@gifts_routes.route('/<int:id>', methods=['PATCH'])
def edit_gift(id):
    form = GiftForm()
    form['csrf_token'].data=request.cookies['csrf_token']

    if form.validate_on_submit():
        gift = Gift.query.filter(Gift.id==id).first()
        gift_name = form.data['gift_name']
        gift_description = form.data['gift_description']
        gift_link = form.data['gift_link']

        gift.gift_name = gift_name
        gift.gift_description = gift_description
        gift.gift_link = gift_link
        db.session.commit()
        return gift.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
