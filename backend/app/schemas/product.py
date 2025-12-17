from typing import Optional
from uuid import UUID
from datetime import datetime
from decimal import Decimal
from pydantic import BaseModel, ConfigDict

class ProductBase(BaseModel):
    name: str
    description: Optional[str] = None
    price: Decimal
    quantity: int
    category: str
    image_url: Optional[str] = None

class ProductCreate(ProductBase):
    pass

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[Decimal] = None
    quantity: Optional[int] = None
    category: Optional[str] = None
    image_url: Optional[str] = None
    is_active: Optional[bool] = None

class DealerPublic(BaseModel):
    business_name: Optional[str] = None
    city: Optional[str] = None
    verified: bool = False

    @staticmethod
    def from_orm(user_obj) -> "DealerPublic":
        # Extract dealer info from user object (handling dealer_profile if it exists)
        business_name = user_obj.username or "Unknown Dealer"
        city = user_obj.location or "Unknown Location"
        verified = False
        
        # Check if the user has a dealer profile relationship (backref 'dealer_profile')
        # Note: relationship is a list because backref default is list-like unless uselist=False specified.
        # But we defined Dealer.user_id as PK, so it's 1-to-1 effectively but sqlalchemy might load as list.
        # Let's handle generic case or assume direct access if configured 1-to-1 properly.
        # However, for simplicity and robustness against the current User/Dealer model structure:
        
        if hasattr(user_obj, "dealer_profile") and user_obj.dealer_profile:
             # If it's a list (default backref behavior without uselist=False)
            profile = user_obj.dealer_profile[0] if isinstance(user_obj.dealer_profile, list) and user_obj.dealer_profile else user_obj.dealer_profile
            
            if not isinstance(profile, list): # It's the object
                 business_name = profile.business_name or business_name
                 city = profile.city or city
                 verified = profile.is_verified

        return DealerPublic(business_name=business_name, city=city, verified=verified)

class ProductResponse(ProductBase):
    id: UUID
    dealer_id: UUID
    is_active: bool
    dealer: Optional[DealerPublic] = None
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)

    @classmethod
    def model_validate(cls, obj, *args, **kwargs):
        # Allow default validation first
        instance = super().model_validate(obj, *args, **kwargs)
        
        # Manually populate dealer if source object has 'dealer' relationship loaded
        if hasattr(obj, "dealer") and obj.dealer:
             instance.dealer = DealerPublic.from_orm(obj.dealer)
        
        return instance

class PaginatedProductResponse(BaseModel):
    items: list[ProductResponse]
    total: int
    page: int
    pages: int
    per_page: int
