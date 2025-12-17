import uuid
from datetime import datetime, date
from typing import Optional

from sqlalchemy import (
    String,
    Boolean,
    Date,
    DateTime,
    func,
    Enum,
)
from sqlalchemy.orm import Mapped, mapped_column
from app.db.session import Base
import enum

class UserRole(str, enum.Enum):
    ADMIN = "admin"
    FARMER = "farmer"
    DEALER = "dealer"
    USER = "user"

class User(Base):
    """Database Model for Users."""

    __tablename__ = "users"

    # Primary Key (UUID preferred for distributed systems)
    id: Mapped[uuid.UUID] = mapped_column(
        default=uuid.uuid4,
        primary_key=True,
        index=True,
        unique=True,
        nullable=False,
    )

    # Required Fields
    email: Mapped[str] = mapped_column(
        String(255),
        unique=True,
        index=True,
        nullable=False,
    )
    password_hash: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
        comment="Hashed password using bcrypt/argon2; never store plaintext.",
    )

    # Role
    role: Mapped[UserRole] = mapped_column(
        String(50), 
        default=UserRole.USER,
        nullable=False
    )

    # Optional Profile Fields
    first_name: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)
    last_name: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)
    username: Mapped[Optional[str]] = mapped_column(
        String(30), unique=True, index=True, nullable=True
    )
    birthdate: Mapped[Optional[date]] = mapped_column(Date, nullable=True)
    phone: Mapped[Optional[str]] = mapped_column(String(20), nullable=True, index=True)
    location: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)

    # Terms / Legal
    accept_terms: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)

    # Timestamps
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now,
        nullable=False,
    )

    def __repr__(self) -> str:
        return f"<User id={self.id} email={self.email} username={self.username}>"

    def full_name(self) -> Optional[str]:
        """Returns the full name of the user if both first and last names are provided."""
        if self.first_name and self.last_name:
            return f"{self.first_name} {self.last_name}"
        return None

    def age(self) -> Optional[int]:
        """Calculates the age of the user based on the birthdate."""
        if self.birthdate:
            today = date.today()
            return (
                today.year
                - self.birthdate.year
                - (
                    (today.month, today.day)
                    < (self.birthdate.month, self.birthdate.day)
                )
            )
        return None

    def to_dict(self) -> dict:
        """Converts the User object to a dictionary representation."""
        return {
            "id": str(self.id),
            "email": self.email,
            "role": self.role,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "username": self.username,
            "birthdate": self.birthdate.isoformat() if self.birthdate else None,
            "phone": self.phone,
            "location": self.location,
            "accept_terms": self.accept_terms,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat(),
        }

    # Class methods for convenience
    @classmethod
    def get_by_email(cls, session, email: str) -> Optional["User"]:
        return session.query(cls).filter(cls.email == email).first()

    @classmethod
    def get_by_username(cls, session, username: str) -> Optional["User"]:
        return session.query(cls).filter(cls.username == username).first()
    
    @classmethod
    def get_by_phone(cls, session, phone: str) -> Optional["User"]:
        return session.query(cls).filter(cls.phone == phone).first()
