from pydantic import BaseModel, EmailStr
from typing import Optional
from uuid import UUID
from datetime import datetime


# ----------------------------
# Base Schema (shared fields)
# ----------------------------

class DealerBase(BaseModel):
    email: EmailStr
    phone: Optional[str] = None
    business_name: str
    owner_name: Optional[str] = None
    description: Optional[str] = None
    logo_url: Optional[str] = None

    country: Optional[str] = None
    state: Optional[str] = None
    city: Optional[str] = None
    address: Optional[str] = None


# ----------------------------
# For Creation (includes password)
# ----------------------------

class DealerCreate(DealerBase):
    password: str


# ----------------------------
# For Update (all fields optional)
# ----------------------------

class DealerUpdate(BaseModel):
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    business_name: Optional[str] = None
    owner_name: Optional[str] = None
    description: Optional[str] = None
    logo_url: Optional[str] = None

    country: Optional[str] = None
    state: Optional[str] = None
    city: Optional[str] = None
    address: Optional[str] = None


# ----------------------------
# Response Schema
# ----------------------------

class DealerOut(DealerBase):
    id: UUID
    is_active: bool
    is_verified: bool
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True
