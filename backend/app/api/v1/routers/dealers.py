from fastapi import APIRouter

router = APIRouter()

@router.get('/')
def list_dealers():
    return [{"id": 1, "name": "AgriDealer Ltd"}]