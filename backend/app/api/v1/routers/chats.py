from fastapi import APIRouter

router = APIRouter()

@router.get('/posts')
def list_posts():
    return [{"id": 1, "user": "John", "message": "Hello farmers!"}]

@router.post('/posts')
def create_post(message: dict):
    return {"id": 2, **message}

@router.get('/{post_id}')
def get_post(post_id: int):
    return {"id": post_id, "messages": []}

@router.put('/{post_id}')
def update_post(post_id: int, post: dict):
    return {"id": post_id, **post}

@router.delete('/{post_id}')
def delete_post(post_id: int):
    return {"message": f"Chat {post_id} deleted"}

# Comments for messages
@router.post('/{chat_id}/comments')
def add_comment(chat_id: int, comment: dict):
    return {"id": 1, "chat_id": chat_id, **comment}

@router.get('/{chat_id}/comments')
def list_comments(chat_id: int):
    return [{"id": 1, "chat_id": chat_id, "comment": "Great post!"}]

@router.delete('/comments/{comment_id}')
def delete_comment(comment_id: int):
    return {"message": f"Comment {comment_id} deleted"}

# Chat messages
@router.post('/{chat_id}/send')
def send_chat(chat_id: int, message: dict):
    return {"id": 1, "chat_id": chat_id, **message}

@router.get('/{chat_id}')
def get_chat(chat_id: int):
    return [{"id": 1, "chat_id": chat_id, "message": "Hello!"}]

@router.delete('/{chat_id}')
def delete_chat_message(chat_id: int, message_id: int):
    return {"message": f"Message {message_id} from chat {chat_id} deleted"}