import uuid
from typing import Optional

from sqlalchemy import (
    String,
    Float,
    ForeignKey,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.session import Base

class Farmer(Base):
    """Database Model for Farmer Profiles."""
    __tablename__ = "farmers"

    # One-to-One relationship with User
    user_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"), 
        primary_key=True, 
        index=True, 
        unique=True
    )
    
    farm_size: Mapped[Optional[float]] = mapped_column(Float, nullable=True, comment="Size in acres/hectares")
    main_crops: Mapped[Optional[str]] = mapped_column(String(255), nullable=True, comment="Comma separated crops")
    
    # Location (if different from user location)
    address: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    city: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    state: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    country: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)

    # Relationship
    user: Mapped["User"] = relationship("User", backref="farmer_profile")
