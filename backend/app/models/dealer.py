import uuid
from typing import Optional

from sqlalchemy import (
    String,
    Boolean,
    Text,
    ForeignKey,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.session import Base

class Dealer(Base):
    """Database Model for Dealer Profiles."""
    __tablename__ = "dealers"

    # One-to-One relationship with User: user_id is the PK
    user_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"), 
        primary_key=True, 
        index=True, 
        unique=True
    )
    
    business_name: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    logo_url: Mapped[Optional[str]] = mapped_column(String(500), nullable=True)
    
    # Location
    country: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    state: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    city: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    address: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    
    # Verification
    is_verified: Mapped[bool] = mapped_column(Boolean, default=False)
    
    # Metadata
    # Created/Updated are handled by User model mostly, but we can keep specific profile timestamps if needed
    
    # Relationship
    user: Mapped["User"] = relationship("User", backref="dealer_profile")
