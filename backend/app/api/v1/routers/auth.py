from fastapi import APIRouter

router = APIRouter()

@router.post('/register')
def register(dealer: dict):
    return {"id": 1, **dealer}

@router.post('/login')
def login(credentials: dict):
    return {"message": "Login successful", "user_id": 1}

@router.post('/refresh')
def refresh_token(token: str):
    return {"message": "Token refreshed", "token": "new_token_value"}

@router.get('/logout')
def logout():
    return {"message": "Logout successful"}

@router.get('/me')
def get_current_user():
    return {"id": 1, "name": "Current User"}
