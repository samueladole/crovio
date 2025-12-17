from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from uuid import UUID
from datetime import datetime

# ----------------------------
# Dealer Public Profile
# ----------------------------

class DealerPublic(BaseModel):
    id: UUID  # User ID
    business_name: str
    owner_name: Optional[str] = None
    description: Optional[str] = None
    logo_url: Optional[str] = None
    
    # Location
    city: Optional[str] = None
    state: Optional[str] = None
    country: Optional[str] = None
    address: Optional[str] = None
    
    # Verification
    is_verified: bool = False
    rating: float = 0.0 # Placeholder or calculated
    products_count: int = 0 # Calculated

    model_config = ConfigDict(from_attributes=True)

    @classmethod
    def from_user(cls, user) -> "DealerPublic":
        # Defaults
        business_name = user.username or "Unknown Dealer"
        city = user.location
        state = None
        verified = False
        description = None
        logo_url = None
        
        # If dealer profile exists
        if hasattr(user, "dealer_profile") and user.dealer_profile:
             # Handle list vs object (backref quirks)
            profile = user.dealer_profile[0] if isinstance(user.dealer_profile, list) and user.dealer_profile else user.dealer_profile
            
            if not isinstance(profile, list) and profile: 
                 business_name = profile.business_name or business_name
                 city = profile.city or city
                 state = profile.state
                 verified = profile.is_verified
                 description = profile.description
                 logo_url = profile.logo_url
        
        return cls(
            id=user.id,
            business_name=business_name,
            city=city,
            state=state,
            is_verified=verified,
            description=description,
            logo_url=logo_url,
            # owner_name=user.full_name() # If we add full_name property to schema
        )

