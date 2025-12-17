from typing import List, Optional
from uuid import UUID
from math import ceil
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.api.deps import get_db, get_current_user
from app.models.product import Product
from app.schemas.product import ProductCreate, ProductUpdate, ProductResponse, PaginatedProductResponse
from app.models.users import User

router = APIRouter()

@router.get("/", response_model=PaginatedProductResponse)
def list_products(
    db: Session = Depends(get_db),
    page: int = Query(1, ge=1, description="Page number"),
    per_page: int = Query(20, ge=1, le=100, description="Items per page"),
    category: Optional[str] = None,
    search: Optional[str] = None,
    dealer_id: Optional[UUID] = None
):
    """List products with optional filtering and pagination."""
    query = db.query(Product).filter(Product.is_active == True)
    
    if category:
        query = query.filter(Product.category == category)
    
    if dealer_id:
        query = query.filter(Product.dealer_id == dealer_id)
    
    if search:
        query = query.filter(Product.name.ilike(f"%{search}%"))
        
    total = query.count()
    pages = ceil(total / per_page)
    skip = (page - 1) * per_page
    
    items = query.offset(skip).limit(per_page).all()
    
    return {
        "items": items,
        "total": total,
        "page": page,
        "pages": pages,
        "per_page": per_page
    }

@router.post("/", response_model=ProductResponse, status_code=status.HTTP_201_CREATED)
def create_product(
    product: ProductCreate,
    db: Session = Depends(get_db),
    current_user_id: str = Depends(get_current_user)
):
    """Create a new product. Requires authentication."""
    # Verify user exists (optional, implicit by token)
    
    new_product = Product(
        **product.model_dump(),
        dealer_id=UUID(current_user_id) # Assign to current user
    )
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return new_product

@router.get("/{product_id}", response_model=ProductResponse)
def get_product(product_id: UUID, db: Session = Depends(get_db)):
    """Get a specific product."""
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@router.put("/{product_id}", response_model=ProductResponse)
def update_product(
    product_id: UUID, 
    product_update: ProductUpdate,
    db: Session = Depends(get_db),
    current_user_id: str = Depends(get_current_user)
):
    """Update a product. Only the owner can update."""
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
        
    if str(product.dealer_id) != current_user_id:
        raise HTTPException(status_code=403, detail="Not authorized to update this product")
        
    update_data = product_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(product, key, value)
        
    db.commit()
    db.refresh(product)
    return product

@router.delete("/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_product(
    product_id: UUID,
    db: Session = Depends(get_db),
    current_user_id: str = Depends(get_current_user)
):
    """Delete a product. Only the owner can delete."""
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
        
    if str(product.dealer_id) != current_user_id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this product")
        
    db.delete(product)
    db.commit()
