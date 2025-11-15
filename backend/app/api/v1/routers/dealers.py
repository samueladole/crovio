from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.api.deps import get_db
from models import Dealer
from schemas.dealer import DealerCreate, DealerOut

router = APIRouter()

@router.post('/register')
def register_dealer(dealer: dict):
    return {"id": 1, **dealer}

@router.post('/login')
def login_dealer(credentials: dict):
    return {"message": "Login successful", "dealer_id": 1}

@router.get('/', response_model=List[DealerOut])
def list_dealers(db: Session = Depends(get_db)):
    values = db.query(Dealer).filter().all()
    print(values)
    return values

@router.get('/{dealer_id}')
def get_dealer(dealer_id: int):
    return {"id": dealer_id, "name": f"Dealer {dealer_id}"}

@router.post('/')
def create_dealer(dealer_payload: DealerCreate, db: Session = Depends(get_db)):
    dealer_data = dealer_payload.model_dump()
    password = dealer_data.pop('password', None)  # Remove password before creating Dealer instance
    dealer = Dealer(**dealer_data, hashed_password=password)
    db.add(dealer)
    db.commit()
    db.refresh(dealer)
    return dealer

@router.put('/{dealer_id}')
def update_dealer(dealer_id: int, dealer: dict):
    return {"id": dealer_id, **dealer}

@router.delete('/{dealer_id}')
def delete_dealer(dealer_id: int):
    return {"message": f"Dealer {dealer_id} deleted"}
