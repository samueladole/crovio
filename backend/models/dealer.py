from sqlalchemy import Column, String, Boolean, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from db.session import Base
import uuid

class Dealer(Base):
    __tablename__ = "dealers"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    # Authentication
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    phone = Column(String, unique=True, index=True)
    # Dealer profile
    business_name = Column(String, nullable=False)
    owner_name = Column(String, nullable=True)
    description = Column(String, nullable=True)
    logo_url = Column(String, nullable=True)
    # Location
    country = Column(String, nullable=True)
    state = Column(String, nullable=True)
    city = Column(String, nullable=True)
    address = Column(String, nullable=True)
    # Verification / Account
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)
