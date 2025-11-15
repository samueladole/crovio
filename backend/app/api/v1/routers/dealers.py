from fastapi import APIRouter

router = APIRouter()

@router.post('/register')
def register_dealer(dealer: dict):
    return {"id": 1, **dealer}

@router.post('/login')
def login_dealer(credentials: dict):
    return {"message": "Login successful", "dealer_id": 1}

@router.get('/')
def list_dealers():
    return [{"id": 1, "name": "AgriDealer Ltd"}]

@router.get('/{dealer_id}')
def get_dealer(dealer_id: int):
    return {"id": dealer_id, "name": f"Dealer {dealer_id}"}

@router.post('/')
def create_dealer(dealer: dict):
    return {"id": 2, **dealer}

@router.put('/{dealer_id}')
def update_dealer(dealer_id: int, dealer: dict):
    return {"id": dealer_id, **dealer}

@router.delete('/{dealer_id}')
def delete_dealer(dealer_id: int):
    return {"message": f"Dealer {dealer_id} deleted"}
