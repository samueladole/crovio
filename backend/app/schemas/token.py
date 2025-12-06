import os
from pydantic import BaseModel
from datetime import timedelta

class TokenResponse(BaseModel):
    """Schema for JWT token response."""
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    user_id: str

class Settings(BaseModel):
    """Configuration settings for JWT and token expiration."""
    JWT_ALGORITHM: str = "HS256"
    JWT_SECRET_KEY: str = os.getenv('SECRET_KEY', '53c6bf26d896057')
    JWT_REFRESH_SECRET_KEY: str = os.getenv('REFRESH_SECRET_KEY', '4f7e1d2c9a8b204')
    ACCESS_TOKEN_EXPIRES_IN: int = 15         # minutes
    REFRESH_TOKEN_EXPIRES_IN: int = 60 * 24 * 7  # 7 days

settings = Settings()

def get_access_token_expiry() -> timedelta:
    """Get the access token expiration time as a timedelta."""
    return timedelta(minutes=settings.ACCESS_TOKEN_EXPIRES_IN)

def get_refresh_token_expiry() -> timedelta:
    """Get the refresh token expiration time as a timedelta."""
    return timedelta(minutes=settings.REFRESH_TOKEN_EXPIRES_IN)
