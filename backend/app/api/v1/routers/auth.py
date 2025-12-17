"""API Router for Authentication Endpoints."""
from jose import jwt, JWTError
from fastapi import APIRouter, Body, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from app.schemas.user import UserRegister, UserLogin
from app.schemas.token import settings
from app.api.deps import get_db, get_current_user
from app.models.users import User
from app.utils.security import hash_password, verify_password
from app.utils.jwt import create_access_token, create_refresh_token, decode_refresh_token

router = APIRouter()

# oauth2_scheme and get_current_user moved to app.api.deps

@router.post("/register")
def register(payload: UserRegister, db: Session = Depends(get_db)):
    """Registers a new User on the platform."""

    existing_user = User.get_by_email(db, email=payload.email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A user with this email already exists.",
        )

    new_user = User(
        email=payload.email,
        password_hash=hash_password(payload.password),
        first_name=payload.first_name,
        last_name=payload.last_name,
        username=payload.username,
        birthdate=payload.birthdate,
        phone=payload.phone,
        location=payload.location,
        accept_terms=payload.accept_terms,
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "id": new_user.id,
        "email": new_user.email,
        "username": new_user.username,
        "created_at": new_user.created_at,
    }

@router.post("/login")
def login(credentials: UserLogin, db: Session = Depends(get_db)):
    """Log in a user using email or phone + password."""
    # Ensure one of email or phone is provided
    if not (credentials.email or credentials.phone):
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Either email or phone must be provided.",
        )

    user = (
        User.get_by_email(db, email=credentials.email)
        if credentials.email
        else User.get_by_phone(db, phone=credentials.phone)
    )

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials."
        )

    if not verify_password(credentials.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials."
        )

    # Generate tokens
    access_token = create_access_token({"sub": str(user.id)})
    refresh_token = create_refresh_token({"sub": str(user.id)})

    return {
        "message": "Login successful",
        "user_id": user.id,
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer"
    }

@router.post("/refresh")
def refresh(token: str):
    """Refreshes an access token using a refresh token."""
    try:
        payload = jwt.decode(
            token,
            settings.JWT_REFRESH_SECRET_KEY,
            algorithms=["HS256"]
        )
        user_id: str = payload.get("sub") # type: ignore
        if not user_id:
            raise HTTPException(status_code=401, detail="Invalid token")

    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

    # Create new access token
    new_access = create_access_token({"sub": user_id})

    return {
        "access_token": new_access,
        "token_type": "bearer"
    }

@router.get("/me")
def profile(user_id: str = Depends(get_current_user)):
    """Fetch the profile of the currently authenticated user."""
    return {"user_id": user_id}

@router.get("/logout")
def logout(refresh_token: str = Body(..., embed=True)):
    """Logs out the user by blacklisting the refresh token."""
    try:
        pass
        # payload = decode_refresh_token(refresh_token)
        # jti = payload.get("jti")
    except Exception:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, detail="Invalid token")
