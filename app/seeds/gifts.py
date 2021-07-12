from app.models import db, Gift

def seed_gifts():
    gift1 = Gift(
        list_id=1, gift_name='Fish Bowl', gift_description='PETCO fish bowl', gift_link='www.petco.com/', purchased=False
    )

    db.session.add(gift1)
    db.session.commit()

def undo_gifts():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
