from typing import List
from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.api.deps import get_db
from app.models.users import User, UserRole
from app.schemas.dealer import DealerPublic

router = APIRouter()

@router.get('/', response_model=List[DealerPublic])
def list_dealers(db: Session = Depends(get_db)):
    """List all verified dealers."""
    # Query users with dealer role
    dealers = db.query(User).filter(User.role == UserRole.DEALER).all()
    
    # Convert to Public Dealer Schema using the helper method
    return [DealerPublic.from_user(d) for d in dealers]

@router.get('/{dealer_id}', response_model=DealerPublic)
def get_dealer(dealer_id: UUID, db: Session = Depends(get_db)):
    """Get specific dealer by ID."""
    dealer = db.query(User).filter(User.id == dealer_id, User.role == UserRole.DEALER).first()
    if not dealer:
        raise HTTPException(status_code=404, detail="Dealer not found")
    
    return DealerPublic.from_user(dealer)

