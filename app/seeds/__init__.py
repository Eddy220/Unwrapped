from flask.cli import AppGroup
from .users import seed_users, undo_users
from .giftlists import seed_giftlists, undo_giftlists
from .gifts import seed_gifts, undo_gifts

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_giftlists()
    seed_gifts()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_giftlists()
    undo_gifts()
    # Add other undo functions here
