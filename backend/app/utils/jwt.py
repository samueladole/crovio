"""Utility functions for creating JWT tokens."""

from datetime import datetime, timedelta
from jose import jwt, JWTError
from app.schemas.token import (
    settings,
    get_access_token_expiry,
    get_refresh_token_expiry,
)


def create_access_token(data: dict):
    """Create a JWT access token."""
    to_encode = data.copy()
    expire = datetime.utcnow() + get_access_token_expiry()
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, settings.JWT_SECRET_KEY, algorithm="HS256")


def create_refresh_token(data: dict):
    """Create a JWT refresh token."""
    to_encode = data.copy()
    expire = datetime.utcnow() + get_refresh_token_expiry()
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, settings.JWT_REFRESH_SECRET_KEY, algorithm="HS256")


def decode_access_token(token: str):
    """Decode a JWT access token."""
    try:
        payload = jwt.decode(
            token, settings.JWT_SECRET_KEY, algorithms=[settings.JWT_ALGORITHM]
        )
        return payload
    except JWTError as e:
        raise e


def decode_refresh_token(token: str):
    """Decode a JWT refresh token."""
    try:
        payload = jwt.decode(
            token, settings.JWT_REFRESH_SECRET_KEY, algorithms=[settings.JWT_ALGORITHM]
        )
        return payload
    except JWTError as e:
        raise e
