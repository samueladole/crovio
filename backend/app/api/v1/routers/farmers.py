from fastapi import APIRouter

router = APIRouter()

@router.get('/')
def list_farmers():
    return [{"id": 1, "name": "John Doe"}]
