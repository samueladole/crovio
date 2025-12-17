import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from app.api.v1.routers import (
    farmers_router,
    products_router,
    dealers_router,
    prices_router,
    chats_router,
    auth_router,
    community_router,
    crop_router
)

load_dotenv()

APP_NAME = os.getenv("APP_NAME", "Crovio Backend API")
app = FastAPI(title=APP_NAME)

# CORS logic
origins = [
    "http://localhost:3000",
    "http://localhost:8080",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/api/v1/auth", tags=["Auth"])
app.include_router(products_router, prefix="/api/v1/products", tags=["Products"])
app.include_router(community_router, prefix="/api/v1/community", tags=["Community"])
app.include_router(crop_router, prefix="/api/v1/crop", tags=["Crop Tools"])

# Existing placeholders (keep or remove if obsolete, but keeping as per file list)
app.include_router(farmers_router, prefix="/api/v1/farmers", tags=["Farmers"])
app.include_router(dealers_router, prefix="/api/v1/dealers", tags=["Dealers"])
app.include_router(prices_router, prefix="/api/v1/prices", tags=["Prices"])
app.include_router(chats_router, prefix="/api/v1/chats", tags=["Chats"])

@app.get("/")
def root():
    return {"message": "Welcome to Crovio API"}
