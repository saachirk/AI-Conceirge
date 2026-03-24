users = {}

def save_user(user_id, data):
    users[user_id] = data
    return users[user_id]

def get_user(user_id):
    return users.get(user_id, {})