from typing import List, Optional
from uuid import UUID
from math import ceil
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.api.deps import get_db
from app.models.users import User, UserRole
from app.schemas.dealer import DealerPublic, PaginatedDealerResponse

router = APIRouter()

@router.get('/', response_model=PaginatedDealerResponse)
def list_dealers(
    db: Session = Depends(get_db),
    page: int = Query(1, ge=1, description="Page number"),
    per_page: int = Query(20, ge=1, le=100, description="Items per page"),
):
    """List all dealers with pagination."""
    # Query users with dealer role
    query = db.query(User).filter(User.role == UserRole.DEALER)
    
    total = query.count()
    pages = ceil(total / per_page)
    skip = (page - 1) * per_page
    
    dealers = query.offset(skip).limit(per_page).all()
    
    # Convert to Public Dealer Schema using the helper method
    return {
        "items": [DealerPublic.from_user(d) for d in dealers],
        "total": total,
        "page": page,
        "pages": pages,
        "per_page": per_page
    }

@router.get('/{dealer_id}', response_model=DealerPublic)
def get_dealer(dealer_id: UUID, db: Session = Depends(get_db)):
    """Get specific dealer by ID."""
    dealer = db.query(User).filter(User.id == dealer_id, User.role == UserRole.DEALER).first()
    if not dealer:
        raise HTTPException(status_code=404, detail="Dealer not found")
    
    return DealerPublic.from_user(dealer)

