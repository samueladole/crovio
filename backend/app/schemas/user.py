from pydantic import BaseModel, EmailStr, Field, field_validator
from typing import Optional
from datetime import date


class UserRegister(BaseModel):
    """Schema for User Registration."""

    email: EmailStr = Field(
        ..., description="User email address. Must be unique and valid."
    )
    password: str = Field(
        ...,
        min_length=8,
        max_length=128,
        description="User password. Must contain uppercase, lowercase, number, and symbol.",
    )

    first_name: Optional[str] = Field(
        None,
        min_length=1,
        max_length=50,
        pattern=r"^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$",
        description="First name with letters only.",
    )
    last_name: Optional[str] = Field(
        None,
        min_length=1,
        max_length=50,
        pattern=r"^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$",
        description="Last name with letters only.",
    )

    username: Optional[str] = Field(
        None,
        min_length=3,
        max_length=30,
        pattern=r"^[a-zA-Z0-9_.-]+$",
        description="Unique username with allowed characters: letters, numbers, underscore, dot, hyphen.",
    )

    birthdate: Optional[date] = Field(
        None, description="User birthdate; must be 13+ years old."
    )

    phone: Optional[str] = Field(
        None,
        pattern=r"^\+?[0-9]{7,15}$",
        description="Optional phone number in international format.",
    )

    location: Optional[str] = Field(
        None, max_length=100, description="Optional user location."
    )

    accept_terms: bool = Field(
        ..., description="User must accept terms and conditions to register."
    )

    # -------------------------
    # Validators
    # -------------------------

    @field_validator("password")
    def validate_password_strength(cls, v: str):
        """
        Ensure password meets strong complexity rules.
        """
        import re

        if not re.search(r"[A-Z]", v):
            raise ValueError("Password must contain at least one uppercase letter.")
        if not re.search(r"[a-z]", v):
            raise ValueError("Password must contain at least one lowercase letter.")
        if not re.search(r"[0-9]", v):
            raise ValueError("Password must contain at least one number.")
        if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", v):
            raise ValueError("Password must contain at least one special character.")
        return v

    @field_validator("birthdate")
    def validate_age(cls, v):
        """
        Validate minimum age of 13.
        """
        if v is None:
            return v
        today = date.today()
        age = today.year - v.year - ((today.month, today.day) < (v.month, v.day))
        if age < 13:
            raise ValueError("User must be at least 13 years old.")
        return v

    @field_validator("accept_terms")
    def terms_must_be_accepted(cls, v):
        if v is not True:
            raise ValueError("Terms and conditions must be accepted.")
        return v

class UserLogin(BaseModel):
    """Schema for User Login."""
    email: Optional[EmailStr] = Field(None, description="User email address")
    phone: Optional[str] = Field(
        None, description="User phone number in international format"
    )
    password: str = Field(..., min_length=8, description="User password")
