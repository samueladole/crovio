from fastapi import APIRouter

router = APIRouter()

@router.get('/')
def get_prices():
    return [{"product_id": 1, "price": 1000}]
