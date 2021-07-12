from app.models import db, Giftlist

def seed_giftlists():
    giftlist1 = Giftlist(
        user_id=1, list_name='giftlist1'
    )

    db.session.add(giftlist1)
    db.session.commit()


def undo_giftlists():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
